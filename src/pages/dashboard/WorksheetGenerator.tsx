import { useState } from "react";
import { useGenerationLimit } from "@/hooks/useGenerationLimit";
import GenerationLimitDialog from "@/components/GenerationLimitDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Download, Save, FileText, Sparkles, CheckCircle, Printer, GraduationCap } from "lucide-react";
import { saveResource, downloadElementAsPDF } from "@/lib/resourceUtils";
import RegenerateOptions, { type RegenerateAction } from "@/components/lesson/RegenerateOptions";
import TopicSuggestions from "@/components/TopicSuggestions";

interface WorksheetQuestion {
  number: number;
  question: string;
  responseType: "short_answer" | "multiple_choice" | "fill_in_blank" | "open_ended";
  options: string[];
  linesForResponse: number;
}

interface Worksheet {
  title: string;
  instructions: string;
  questions: WorksheetQuestion[];
  answerKey: { number: number; answer: string }[];
}

const GRADES = ["K", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
const DIFFICULTIES = ["Easy", "Intermediate", "Hard", "Mixed"];
const QUESTION_COUNTS = ["5", "8", "10", "12", "15", "20"];

const WorksheetGenerator = () => {
  const { hasReachedLimit, incrementUsage } = useGenerationLimit();
  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const [gradeLevel, setGradeLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("10");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [worksheet, setWorksheet] = useState<Worksheet | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regenAction, setRegenAction] = useState<RegenerateAction | null>(null);

  const handleGenerate = async (regenerateAction?: RegenerateAction) => {
    if (hasReachedLimit) { setShowLimitDialog(true); return; }
    if (!gradeLevel || !subject || !topic) {
      toast({ title: "Missing fields", description: "Please fill in Grade Level, Subject, and Topic.", variant: "destructive" });
      return;
    }

    const isRegen = !!regenerateAction;
    if (isRegen) { setIsRegenerating(true); setRegenAction(regenerateAction!); }
    else { setIsGenerating(true); }

    try {
      const { data, error } = await supabase.functions.invoke("generate-worksheet", {
        body: { gradeLevel, subject, topic, numberOfQuestions, difficultyLevel, regenerateAction },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setWorksheet(data.worksheet);
      await incrementUsage();
      toast({ title: isRegen ? "Worksheet regenerated!" : "Worksheet generated!" });
    } catch (e: any) {
      console.error(e);
      toast({ title: "Generation failed", description: e.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
      setIsRegenerating(false);
      setRegenAction(null);
    }
  };

  const handleSave = async () => {
    if (!worksheet) return;
    await saveResource({
      title: worksheet.title,
      resourceType: "worksheet",
      gradeLevel,
      subject,
      topic,
      content: worksheet as unknown as Record<string, unknown>,
    });
  };

  const handleDownloadPDF = () => downloadElementAsPDF("worksheet-output", worksheet?.title || "worksheet");

  return (
    <div className="mx-auto max-w-4xl">
      <GenerationLimitDialog open={showLimitDialog} onOpenChange={setShowLimitDialog} />
      <h1 className="mb-1 font-display text-2xl font-bold text-foreground">Worksheet Generator</h1>
      <p className="mb-8 text-muted-foreground">Create printable worksheets with answer keys, powered by AI.</p>

      <Card className="mb-8 rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary" />
            Worksheet Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Grade Level *</Label>
              <Select value={gradeLevel} onValueChange={setGradeLevel}>
                <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Select grade" /></SelectTrigger>
                <SelectContent>
                  {GRADES.map((g) => <SelectItem key={g} value={g}>{g} Grade</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Subject *</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>
                  {["Math", "ELA", "Science", "Social Studies", "History"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Topic *</Label>
              <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Fractions, Photosynthesis" className="mt-1 rounded-xl" />
              <TopicSuggestions subject={subject} onSelect={setTopic} />
            </div>
            <div>
              <Label>Number of Questions</Label>
              <Select value={numberOfQuestions} onValueChange={setNumberOfQuestions}>
                <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="10" /></SelectTrigger>
                <SelectContent>
                  {QUESTION_COUNTS.map((n) => <SelectItem key={n} value={n}>{n} questions</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Difficulty Level</Label>
              <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
                <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Intermediate" /></SelectTrigger>
                <SelectContent>
                  {DIFFICULTIES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={() => handleGenerate()} disabled={isGenerating} className="w-full rounded-xl" size="lg">
            {isGenerating ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Worksheet…</>
            ) : (
              <><Sparkles className="mr-2 h-4 w-4" /> Generate Worksheet</>
            )}
          </Button>
        </CardContent>
      </Card>

      {worksheet && (
        <>
          <div className="mb-4 flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-xl" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Save Worksheet
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
          </div>

          <div className="mb-4">
            <RegenerateOptions
              onAction={(action) => handleGenerate(action)}
              isLoading={isRegenerating}
              loadingAction={regenAction}
              showAddQuestions
            />
          </div>

          <div id="worksheet-output" className="rounded-2xl border bg-card shadow-lg print:shadow-none print:border-0 print:bg-white" style={{ maxWidth: 816, margin: "0 auto", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            {/* Page 1 */}
            <div className="px-[0.75in] py-[0.6in]">
              {/* Premium Header Bar */}
              <div className="rounded-lg border border-border/60" style={{ background: "linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--muted)/0.4) 100%)" }}>
                <div className="flex items-center justify-between px-6 pt-2 pb-0">
                  <span className="flex items-center gap-1 font-sans text-[9px] font-semibold tracking-[0.15em] uppercase text-muted-foreground/50"><GraduationCap className="h-3 w-3" />TeachKit</span>
                </div>
                <div className="flex items-start justify-between gap-4 px-6 pb-5 pt-1">
                  <div className="space-y-2">
                    <span className="inline-block rounded-full px-3 py-1 font-sans text-[11px] font-bold tracking-wide uppercase" style={{ background: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" }}>
                      {subject}
                    </span>
                    <h2 className="text-[22px] font-bold leading-tight text-foreground tracking-tight">{worksheet.title}</h2>
                    <p className="text-xs text-muted-foreground tracking-wide">
                      Grade {gradeLevel} &nbsp;•&nbsp; {topic}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 pt-1 text-[13px] text-foreground/70 whitespace-nowrap">
                    <div>Name: <span className="inline-block border-b border-foreground/40" style={{ width: 200 }}>&nbsp;</span></div>
                    <div>Date: <span className="inline-block border-b border-foreground/40" style={{ width: 140 }}>&nbsp;</span></div>
                  </div>
                </div>
              </div>

              {/* Directions */}
              <div className="mt-7 rounded-md border border-border/50 px-5 py-3.5" style={{ background: "hsl(var(--muted)/0.25)" }}>
                <p className="text-[13px] leading-relaxed text-foreground/80">
                  <span className="font-bold text-foreground">Directions:</span>{" "}
                  <span className="italic">{worksheet.instructions}</span>
                </p>
              </div>

              {/* Questions */}
              <div className="mt-8 space-y-5">
                {worksheet.questions.map((q) => (
                  <div key={q.number} className="rounded-lg border border-border/40 px-5 py-4" style={{ background: "hsl(var(--muted)/0.08)" }}>
                    <p className="text-[14px] leading-relaxed text-foreground">
                      <span className="mr-2.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold" style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" }}>{q.number}</span>
                      {q.question}
                    </p>

                    {q.responseType === "multiple_choice" && q.options.length > 0 && (
                      <div className="ml-9 mt-3 space-y-1.5">
                        {q.options.map((opt, i) => (
                          <p key={i} className="text-[13px] text-foreground">
                            <span className="mr-2 inline-block w-5 font-semibold text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
                            {opt}
                          </p>
                        ))}
                      </div>
                    )}

                    {q.responseType === "fill_in_blank" && (
                      <div className="ml-9 mt-4 space-y-4">
                        <div className="border-b border-foreground/20" style={{ height: 20 }} />
                      </div>
                    )}

                    {(q.responseType === "short_answer" || q.responseType === "open_ended") && (
                      <div className="ml-9 mt-4 space-y-4">
                        {Array.from({ length: q.linesForResponse || 3 }).map((_, i) => (
                          <div key={i} className="border-b border-foreground/15" style={{ height: 20 }} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-10 flex items-center justify-between border-t-2 border-border/30 pt-3">
                <span className="font-sans text-[10px] font-medium text-muted-foreground/60 tracking-wide">© TeachKit Resource Shop</span>
                <span className="font-sans text-[10px] font-medium text-muted-foreground/60">Page 1 of 2</span>
              </div>
            </div>

            {/* Answer Key — Page 2 */}
            <div className="border-t-2 border-dashed border-border/50 px-[0.75in] py-[0.6in]">
              <div className="mb-6 flex items-center gap-2.5 rounded-lg px-5 py-3" style={{ background: "hsl(var(--secondary)/0.08)", border: "1px solid hsl(var(--secondary)/0.2)" }}>
                <CheckCircle className="h-5 w-5" style={{ color: "hsl(var(--secondary))" }} />
                <h3 className="text-lg font-bold text-foreground tracking-tight">Answer Key</h3>
              </div>
              <div className="space-y-2.5 pl-2">
                {worksheet.answerKey.map((a) => (
                  <div key={a.number} className="flex gap-3 text-[13px]">
                    <span className="font-bold min-w-[2rem]" style={{ color: "hsl(var(--primary))" }}>{a.number}.</span>
                    <span className="text-foreground">{a.answer}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex items-center justify-between border-t-2 border-border/30 pt-3">
                <span className="font-sans text-[10px] font-medium text-muted-foreground/60 tracking-wide">© TeachKit Resource Shop</span>
                <span className="font-sans text-[10px] font-medium text-muted-foreground/60">Page 2 of 2</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WorksheetGenerator;
