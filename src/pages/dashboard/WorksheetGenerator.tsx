import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Download, Save, FileText, Sparkles, CheckCircle } from "lucide-react";
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
          </div>

          <div className="mb-4">
            <RegenerateOptions
              onAction={(action) => handleGenerate(action)}
              isLoading={isRegenerating}
              loadingAction={regenAction}
              showAddQuestions
            />
          </div>

          <div id="worksheet-output" className="rounded-2xl border bg-white dark:bg-card shadow-sm" style={{ maxWidth: 816, margin: "0 auto", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            <div className="px-12 py-10">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b-2 border-foreground/20 pb-4">
                <div>
                  <span className="inline-block rounded bg-primary/10 px-2.5 py-0.5 font-sans text-xs font-semibold text-primary">
                    {subject}
                  </span>
                  <h2 className="mt-2 font-display text-xl font-bold text-foreground">{worksheet.title}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Grade {gradeLevel} &nbsp;•&nbsp; {topic}
                  </p>
                </div>
                <div className="text-right text-sm text-muted-foreground whitespace-nowrap">
                  <div>Name: ________________________________</div>
                  <div className="mt-1.5">Date: ___________________</div>
                </div>
              </div>

              {/* Directions */}
              <div className="mt-6 rounded-lg border border-border bg-muted/20 px-5 py-3">
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">Directions:</span>{" "}
                  <span className="italic">{worksheet.instructions}</span>
                </p>
              </div>

              {/* Questions */}
              <div className="mt-8 space-y-0">
                {worksheet.questions.map((q, idx) => (
                  <div key={q.number} className={idx > 0 ? "border-t border-dashed border-border pt-6 mt-6" : ""}>
                    <p className="text-sm text-foreground">
                      <span className="mr-2 font-bold text-foreground">{q.number})</span>
                      {q.question}
                    </p>

                    {q.responseType === "multiple_choice" && q.options.length > 0 && (
                      <div className="ml-7 mt-2 space-y-1">
                        {q.options.map((opt, i) => (
                          <p key={i} className="text-sm text-foreground">
                            <span className="mr-2 font-medium text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
                            {opt}
                          </p>
                        ))}
                      </div>
                    )}

                    {q.responseType === "fill_in_blank" && (
                      <div className="ml-7 mt-3 space-y-3">
                        <div className="border-b border-muted-foreground/30 h-5" />
                      </div>
                    )}

                    {(q.responseType === "short_answer" || q.responseType === "open_ended") && (
                      <div className="ml-7 mt-3 space-y-3">
                        {Array.from({ length: q.linesForResponse || 3 }).map((_, i) => (
                          <div key={i} className="border-b border-muted-foreground/25 h-5" />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-10 flex items-center justify-between border-t border-foreground/10 pt-3">
                <span className="text-[10px] text-muted-foreground/50">© TeachKit</span>
                <span className="text-[10px] text-muted-foreground/50">Page 1</span>
              </div>
            </div>

            {/* Answer Key */}
            <div className="border-t-2 border-dashed border-border px-12 py-10">
              <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-foreground">
                <CheckCircle className="h-5 w-5 text-secondary" /> Answer Key
              </h3>
              <div className="space-y-2">
                {worksheet.answerKey.map((a) => (
                  <div key={a.number} className="flex gap-2 text-sm">
                    <span className="font-bold text-primary min-w-[2rem]">{a.number}.</span>
                    <span className="text-foreground">{a.answer}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-foreground/10 pt-3">
                <span className="text-[10px] text-muted-foreground/50">© TeachKit</span>
                <span className="text-[10px] text-muted-foreground/50">Answer Key</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WorksheetGenerator;
