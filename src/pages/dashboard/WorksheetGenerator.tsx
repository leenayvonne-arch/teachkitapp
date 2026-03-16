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

  const handleGenerate = async () => {
    if (!gradeLevel || !subject || !topic) {
      toast({ title: "Missing fields", description: "Please fill in Grade Level, Subject, and Topic.", variant: "destructive" });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-worksheet", {
        body: { gradeLevel, subject, topic, numberOfQuestions, difficultyLevel },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setWorksheet(data.worksheet);
      toast({ title: "Worksheet generated!", description: "Scroll down to view your worksheet." });
    } catch (e: any) {
      console.error(e);
      toast({ title: "Generation failed", description: e.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
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

      {/* ── INPUT FORM ── */}
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
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Math, Science, ELA" className="mt-1 rounded-xl" />
            </div>
            <div>
              <Label>Topic *</Label>
              <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Fractions, Photosynthesis" className="mt-1 rounded-xl" />
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

          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full rounded-xl" size="lg">
            {isGenerating ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Worksheet…</>
            ) : (
              <><Sparkles className="mr-2 h-4 w-4" /> Generate Worksheet</>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* ── OUTPUT ── */}
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

          <div id="worksheet-output" className="rounded-2xl border bg-card p-8 space-y-8">
            {/* Header */}
            <div className="border-b border-border pb-6 text-center">
              <h2 className="font-display text-2xl font-bold text-foreground">{worksheet.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Grade: {gradeLevel} &nbsp;•&nbsp; Subject: {subject} &nbsp;•&nbsp; Topic: {topic}
              </p>
              <div className="mx-auto mt-4 flex max-w-md gap-6 text-sm text-muted-foreground">
                <span>Name: ______________________</span>
                <span>Date: _______________</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="rounded-xl border bg-muted/30 p-4">
              <h3 className="mb-1 font-semibold text-foreground">Instructions</h3>
              <p className="text-sm text-muted-foreground">{worksheet.instructions}</p>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              {worksheet.questions.map((q) => (
                <div key={q.number} className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {q.number}
                    </span>
                    {q.question}
                  </p>

                  {q.responseType === "multiple_choice" && q.options.length > 0 && (
                    <div className="ml-8 space-y-1">
                      {q.options.map((opt, i) => (
                        <p key={i} className="text-sm text-foreground">
                          <span className="mr-2 font-medium text-muted-foreground">
                            {String.fromCharCode(65 + i)}.
                          </span>
                          {opt}
                        </p>
                      ))}
                    </div>
                  )}

                  {q.responseType === "fill_in_blank" && (
                    <div className="ml-8">
                      <div className="mt-1 border-b-2 border-dashed border-muted-foreground/40 w-3/4 h-6" />
                    </div>
                  )}

                  {(q.responseType === "short_answer" || q.responseType === "open_ended") && (
                    <div className="ml-8 space-y-2">
                      {Array.from({ length: q.linesForResponse || 3 }).map((_, i) => (
                        <div key={i} className="border-b border-muted-foreground/20 h-6" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Answer Key */}
            <div className="mt-8 border-t-2 border-dashed border-border pt-6">
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
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
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WorksheetGenerator;
