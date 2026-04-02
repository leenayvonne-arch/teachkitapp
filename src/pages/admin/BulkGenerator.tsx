import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminRole } from "@/hooks/useAdminRole";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Sparkles, Download, Copy, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const GRADES = ["K", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
const SUBJECTS = ["Math", "ELA", "Science", "Social Studies", "History"];
const RESOURCE_TYPES = ["Exit Tickets", "Worksheets", "Quizzes", "Lesson Plans"];

const EDGE_FN_MAP: Record<string, string> = {
  "Exit Tickets": "generate-exit-ticket",
  "Worksheets": "generate-worksheet",
  "Quizzes": "generate-quiz",
  "Lesson Plans": "generate-lesson",
};

interface GeneratedResource {
  topic: string;
  content: any;
}

const BulkGenerator = () => {
  const { isAdmin, loading } = useAdminRole();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [topicsText, setTopicsText] = useState("");
  const [questionsPerResource, setQuestionsPerResource] = useState(3);
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);
  const [includeCoverPage, setIncludeCoverPage] = useState(true);
  const [includeTOC, setIncludeTOC] = useState(true);

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTopic, setCurrentTopic] = useState("");
  const [totalTopics, setTotalTopics] = useState(0);
  const [generatedResources, setGeneratedResources] = useState<GeneratedResource[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !isAdmin) navigate("/dashboard");
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }
  if (!isAdmin) return null;

  const topics = topicsText.split("\n").map(t => t.trim()).filter(Boolean);

  const handleGenerate = async () => {
    if (!productName || !resourceType || !gradeLevel || !subject || topics.length === 0) {
      toast({ title: "Missing fields", description: "Please fill in all fields and add at least one topic.", variant: "destructive" });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setTotalTopics(topics.length);
    setGeneratedResources([]);

    const results: GeneratedResource[] = [];
    const edgeFn = EDGE_FN_MAP[resourceType];

    for (let i = 0; i < topics.length; i++) {
      setProgress(i);
      setCurrentTopic(topics[i]);
      try {
        const baseBody: Record<string, any> = { gradeLevel, subject, topic: topics[i] };

        if (resourceType === "Exit Tickets") {
          baseBody.numberOfQuestions = questionsPerResource;
          baseBody.mixedTypes = true;
        } else if (resourceType === "Worksheets") {
          baseBody.numberOfQuestions = questionsPerResource;
          baseBody.mixedTypes = true;
        } else if (resourceType === "Quizzes") {
          baseBody.numberOfQuestions = questionsPerResource;
          // Let the quiz generator auto-distribute question types
        } else if (resourceType === "Lesson Plans") {
          baseBody.numberOfQuestions = questionsPerResource;
        }

        const { data, error } = await supabase.functions.invoke(edgeFn, {
          body: baseBody,
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        // Extract the main content object from the response
        const content = data.exitTicket || data.worksheet || data.quiz || data.lesson || data;
        results.push({ topic: topics[i], content });
      } catch (e: any) {
        console.error(`Failed to generate for topic: ${topics[i]}`, e);
        results.push({ topic: topics[i], content: { error: e.message || "Generation failed" } });
      }
      setProgress(i + 1);
    }

    setGeneratedResources(results);
    setIsGenerating(false);
    toast({ title: "Bulk generation complete!", description: `Generated ${results.filter(r => !r.content.error).length} of ${topics.length} resources.` });
  };

  const handleCopyAll = () => {
    if (!previewRef.current) return;
    const text = previewRef.current.innerText;
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard" });
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    const html2pdf = (await import("html2pdf.js")).default;
    (html2pdf() as any).set({
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${productName || "bulk-resources"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    }).from(previewRef.current).save();
  };

  const renderResourceContent = (resource: GeneratedResource) => {
    const c = resource.content;
    if (c.error) return <p className="text-destructive italic">Error: {c.error}</p>;

    // Quiz-style content with separate sections
    if (c.multipleChoice || c.trueFalse || c.shortAnswer || c.fillInTheBlank) {
      return (
        <div className="space-y-4">
          {c.multipleChoice?.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Multiple Choice</p>
              {c.multipleChoice.map((q: any, i: number) => (
                <div key={i} className="mb-2">
                  <p className="font-medium text-sm">{q.number}. {q.question}</p>
                  <div className="ml-4 mt-1 grid gap-1 sm:grid-cols-2 text-sm text-muted-foreground">
                    {(["A", "B", "C", "D"] as const).map(l => q.options?.[l] && <p key={l}>{l}. {q.options[l]}</p>)}
                  </div>
                </div>
              ))}
            </div>
          )}
          {c.trueFalse?.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">True / False</p>
              {c.trueFalse.map((q: any, i: number) => (
                <div key={i} className="mb-2">
                  <p className="font-medium text-sm">{q.number}. {q.question}</p>
                </div>
              ))}
            </div>
          )}
          {c.shortAnswer?.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Short Answer</p>
              {c.shortAnswer.map((q: any, i: number) => (
                <div key={i} className="mb-2">
                  <p className="font-medium text-sm">{q.number}. {q.question}</p>
                  <div className="ml-4 mt-1 space-y-2">
                    {Array.from({ length: 3 }).map((_, j) => <div key={j} className="border-b border-muted-foreground/25 h-4" />)}
                  </div>
                </div>
              ))}
            </div>
          )}
          {c.showYourWork?.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Show Your Work</p>
              {c.showYourWork.map((q: any, i: number) => (
                <div key={i} className="mb-3">
                  <p className="font-medium text-sm">{q.number}. {q.question}</p>
                  <div className="ml-4 mt-2 border border-dashed border-muted-foreground/30 rounded-md h-24 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground/50 italic">Work space</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {c.fillInTheBlank?.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Fill in the Blank</p>
              {c.fillInTheBlank.map((q: any, i: number) => (
                <div key={i} className="mb-2">
                  <p className="font-medium text-sm">{q.number}. {q.question}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Generic rendering of questions/content
    if (c.questions && Array.isArray(c.questions)) {
      return (
        <div className="space-y-3">
          {c.questions.map((q: any, i: number) => (
            <div key={i} className="border-b border-border pb-2">
              <p className="font-medium">{q.number || i + 1}. {q.question || q.text || q.prompt || JSON.stringify(q)}</p>
              {q.options && Array.isArray(q.options) && (
                <ul className="ml-4 mt-1 space-y-0.5 text-sm text-muted-foreground">
                  {q.options.map((opt: string, j: number) => <li key={j}>{String.fromCharCode(65 + j)}. {opt}</li>)}
                </ul>
              )}
              {q.type === "show_your_work" && (
                <div className="ml-4 mt-2 border border-dashed border-muted-foreground/30 rounded-md h-24 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground/50 italic">Work space</span>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    // Fallback: render as JSON
    return <pre className="whitespace-pre-wrap text-xs text-muted-foreground">{JSON.stringify(c, null, 2)}</pre>;
  };

  const successCount = generatedResources.filter(r => !r.content.error).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="mx-auto max-w-4xl px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold font-display text-foreground">Bulk Resource Generator</h1>
            <p className="text-sm text-muted-foreground">Admin only — generate multiple resources at once for shop products.</p>
          </div>
          <Link to="/admin" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Admin
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8 space-y-8">
        {/* Section 1 — Product Details */}
        <Card className="rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Product Name *</Label>
              <Input className="mt-1 rounded-xl" placeholder='e.g. "100 Exit Tickets for Grades 6–8"' value={productName} onChange={e => setProductName(e.target.value)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label>Resource Type *</Label>
                <Select value={resourceType} onValueChange={setResourceType}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {RESOURCE_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Grade Level *</Label>
                <Select value={gradeLevel} onValueChange={setGradeLevel}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Select grade" /></SelectTrigger>
                  <SelectContent>
                    {GRADES.map(g => <SelectItem key={g} value={g}>{g} Grade</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Subject *</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Select subject" /></SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2 — Topic List */}
        <Card className="rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Topic List</CardTitle>
          </CardHeader>
          <CardContent>
            <Label>Topics (one per line) *</Label>
            <Textarea
              className="mt-1 min-h-[160px] rounded-xl"
              placeholder={"e.g.\nRatios and Proportional Reasoning\nExpressions and Equations\nGeometry"}
              value={topicsText}
              onChange={e => setTopicsText(e.target.value)}
            />
            <p className="mt-1 text-xs text-muted-foreground">{topics.length} topic{topics.length !== 1 ? "s" : ""} entered</p>
          </CardContent>
        </Card>

        {/* Section 3 — Quantity Settings */}
        <Card className="rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-w-[200px]">
              <Label>Questions per resource</Label>
              <Input
                type="number"
                className="mt-1 rounded-xl"
                min={1}
                max={10}
                value={questionsPerResource}
                onChange={e => setQuestionsPerResource(Math.min(10, Math.max(1, Number(e.target.value))))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Include answer key</Label>
              <Switch checked={includeAnswerKey} onCheckedChange={setIncludeAnswerKey} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Include cover page</Label>
              <Switch checked={includeCoverPage} onCheckedChange={setIncludeCoverPage} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Include table of contents</Label>
              <Switch checked={includeTOC} onCheckedChange={setIncludeTOC} />
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <Button
          size="lg"
          className="w-full rounded-xl text-base"
          disabled={isGenerating}
          onClick={handleGenerate}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating {progress} of {totalTopics}...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Bulk Pack
            </>
          )}
        </Button>

        {/* Progress Bar */}
        {isGenerating && (
          <div className="space-y-2">
            <Progress value={(progress / totalTopics) * 100} className="h-3 rounded-full" />
            <p className="text-center text-sm text-muted-foreground">Generating {progress} of {totalTopics}...</p>
          </div>
        )}

        {/* Preview & Export */}
        {generatedResources.length > 0 && !isGenerating && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Preview ({successCount} resources)</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-xl gap-1.5" onClick={handleCopyAll}>
                  <Copy className="h-4 w-4" /> Copy all text
                </Button>
                <Button size="sm" className="rounded-xl gap-1.5" onClick={handleDownloadPDF}>
                  <Download className="h-4 w-4" /> Download as PDF
                </Button>
              </div>
            </div>

            <div ref={previewRef} className="rounded-2xl border bg-card p-6 space-y-8">
              {/* Cover Page */}
              {includeCoverPage && (
                <div className="text-center py-12 border-b border-border" style={{ pageBreakAfter: "always" }}>
                  <div className="flex justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">TeachKit</p>
                  <h2 className="text-2xl font-bold font-display mb-4">{productName}</h2>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>{resourceType} • {gradeLevel} Grade • {subject}</p>
                    <p>{successCount} resources included</p>
                  </div>
                </div>
              )}

              {/* Table of Contents */}
              {includeTOC && (
                <div className="py-6 border-b border-border" style={{ pageBreakAfter: "always" }}>
                  <h3 className="text-lg font-bold font-display mb-4">Table of Contents</h3>
                  <ol className="space-y-1 text-sm">
                    {generatedResources.filter(r => !r.content.error).map((r, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{i + 1}. {r.topic}</span>
                        <span className="text-muted-foreground">p. {i + (includeCoverPage ? 4 : 2)}</span>
                      </li>
                    ))}
                    {includeAnswerKey && (
                      <li className="flex justify-between font-medium pt-2 border-t">
                        <span>Answer Key</span>
                        <span className="text-muted-foreground">p. {successCount + (includeCoverPage ? 4 : 2)}</span>
                      </li>
                    )}
                  </ol>
                </div>
              )}

              {/* Teacher Instructions */}
              <div className="py-6 border-b border-border" style={{ pageBreakAfter: "always" }}>
                <h3 className="text-lg font-bold font-display mb-3">Teacher Instructions</h3>
                <div className="text-sm text-muted-foreground space-y-3">
                  <div>
                    <p className="font-medium text-foreground">How to use these resources:</p>
                    <p>Each {resourceType.toLowerCase().replace(/s$/, "")} is designed to be a standalone activity covering a single topic. Use them for warm-ups, class practice, homework, or assessment.</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Printing tips:</p>
                    <p>Print single-sided on 8.5×11 paper. Each resource fits on one page. For best results, use "Fit to Page" in your printer settings.</p>
                  </div>
                  {includeAnswerKey && (
                    <div>
                      <p className="font-medium text-foreground">Answer key:</p>
                      <p>The answer key is located at the end of this document. You may remove it before distributing to students.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Resources */}
              {generatedResources.filter(r => !r.content.error).map((resource, i) => (
                <div key={i} className="py-6 border-b border-border" style={{ pageBreakBefore: "always" }}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold font-display">{resource.topic}</h3>
                    <span className="text-xs text-muted-foreground">{resourceType}</span>
                  </div>
                  <div className="flex gap-8 mb-4 text-sm">
                    <div className="flex-1 border-b border-border pb-1">Name: ___________________</div>
                    <div className="border-b border-border pb-1">Date: ___________</div>
                  </div>
                  {renderResourceContent(resource)}
                </div>
              ))}

              {/* Answer Key */}
              {includeAnswerKey && (
                <div className="py-6" style={{ pageBreakBefore: "always" }}>
                  <h3 className="text-lg font-bold font-display mb-4">Answer Key</h3>
                  {generatedResources.filter(r => !r.content.error).map((resource, i) => {
                    const c = resource.content;
                    // Collect all answers from quiz-style or generic questions
                    const answers: { num: number; section: string; answer: string }[] = [];

                    // Quiz-style sections
                    c.multipleChoice?.forEach((q: any) => answers.push({ num: q.number, section: "MC", answer: q.correctAnswer }));
                    c.trueFalse?.forEach((q: any) => answers.push({ num: q.number, section: "T/F", answer: q.correctAnswer }));
                    c.fillInTheBlank?.forEach((q: any) => answers.push({ num: q.number, section: "FITB", answer: q.correctAnswer }));
                    c.shortAnswer?.forEach((q: any) => answers.push({ num: q.number, section: "SA", answer: q.sampleAnswer || q.correctAnswer }));
                    c.showYourWork?.forEach((q: any) => answers.push({ num: q.number, section: "SYW", answer: q.sampleAnswer || q.correctAnswer || "See rubric" }));

                    // Generic questions array
                    if (answers.length === 0 && c.questions && Array.isArray(c.questions)) {
                      c.questions.forEach((q: any, j: number) => {
                        answers.push({ num: q.number || j + 1, section: "", answer: q.answer || q.correctAnswer || q.correct_answer || "See teacher guide" });
                      });
                    }
                    // answerKey array
                    if (answers.length === 0 && c.answerKey && Array.isArray(c.answerKey)) {
                      c.answerKey.forEach((a: any) => {
                        answers.push({ num: a.number, section: a.section || "", answer: a.answer });
                      });
                    }

                    if (answers.length === 0) return null;
                    return (
                      <div key={i} className="mb-4">
                        <p className="font-medium text-sm mb-1">{resource.topic}</p>
                        <div className="text-sm text-muted-foreground space-y-0.5">
                          {answers.map((a, j) => (
                            <p key={j}>{a.section ? `[${a.section}] ` : ""}{a.num}. {a.answer}</p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkGenerator;
