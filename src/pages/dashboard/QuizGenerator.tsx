import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Download, Save, HelpCircle, Sparkles, CheckCircle } from "lucide-react";
import { saveResource, downloadElementAsPDF } from "@/lib/resourceUtils";

interface MCQuestion {
  number: number;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
}

interface SAQuestion {
  number: number;
  question: string;
  sampleAnswer: string;
}

interface AnswerKeyItem {
  number: number;
  section: "multiple_choice" | "short_answer";
  answer: string;
}

interface Quiz {
  title: string;
  multipleChoice: MCQuestion[];
  shortAnswer: SAQuestion[];
  answerKey: AnswerKeyItem[];
}

const GRADES = ["K", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
const QUESTION_COUNTS = ["5", "8", "10", "12", "15", "20"];

const QuizGenerator = () => {
  const [gradeLevel, setGradeLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("10");
  const [isGenerating, setIsGenerating] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  const handleGenerate = async () => {
    if (!gradeLevel || !subject || !topic) {
      toast({ title: "Missing fields", description: "Please fill in Grade Level, Subject, and Topic.", variant: "destructive" });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-quiz", {
        body: { gradeLevel, subject, topic, numberOfQuestions },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setQuiz(data.quiz);
      toast({ title: "Quiz generated!", description: "Scroll down to view your quiz." });
    } catch (e: any) {
      console.error(e);
      toast({ title: "Generation failed", description: e.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!quiz) return;
    await saveResource({
      title: quiz.title,
      resourceType: "quiz",
      gradeLevel,
      subject,
      topic,
      content: quiz as unknown as Record<string, unknown>,
    });
  };

  const handleDownloadPDF = () => downloadElementAsPDF("quiz-output", quiz?.title || "quiz");

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-1 font-display text-2xl font-bold text-foreground">Quiz Generator</h1>
      <p className="mb-8 text-muted-foreground">Create structured quizzes with multiple choice and short answer sections.</p>

      {/* ── INPUT FORM ── */}
      <Card className="mb-8 rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <HelpCircle className="h-5 w-5 text-primary" />
            Quiz Details
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
          </div>

          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full rounded-xl" size="lg">
            {isGenerating ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Quiz…</>
            ) : (
              <><Sparkles className="mr-2 h-4 w-4" /> Generate Quiz</>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* ── OUTPUT ── */}
      {quiz && (
        <>
          <div className="mb-4 flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-xl" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Save Quiz
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </div>

          <div id="quiz-output" className="rounded-2xl border bg-card p-8 space-y-8">
            {/* Quiz Header */}
            <div className="border-b border-border pb-6 text-center">
              <h2 className="font-display text-2xl font-bold text-foreground">{quiz.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Grade: {gradeLevel} &nbsp;•&nbsp; Subject: {subject} &nbsp;•&nbsp; Topic: {topic}
              </p>
              <div className="mx-auto mt-4 flex max-w-lg justify-between text-sm text-muted-foreground">
                <span>Name: ______________________</span>
                <span>Date: _______________</span>
                <span>Subject: {subject}</span>
              </div>
            </div>

            {/* Multiple Choice Section */}
            {quiz.multipleChoice.length > 0 && (
              <div className="space-y-6">
                <h3 className="font-display text-lg font-semibold text-foreground border-b border-border pb-2">
                  Section 1: Multiple Choice
                </h3>
                <p className="text-sm text-muted-foreground">Choose the best answer for each question.</p>
                {quiz.multipleChoice.map((q) => (
                  <div key={q.number} className="space-y-3">
                    <p className="text-sm font-medium text-foreground">
                      <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {q.number}
                      </span>
                      {q.question}
                    </p>
                    <div className="ml-8 grid gap-2 sm:grid-cols-2">
                      {(["A", "B", "C", "D"] as const).map((letter) => (
                        <div key={letter} className="flex items-start gap-2 rounded-lg border border-border p-2.5 text-sm">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/30 text-xs font-bold text-primary">
                            {letter}
                          </span>
                          <span className="text-foreground">{q.options[letter]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Short Answer Section */}
            {quiz.shortAnswer.length > 0 && (
              <div className="space-y-6">
                <h3 className="font-display text-lg font-semibold text-foreground border-b border-border pb-2">
                  Section 2: Short Answer
                </h3>
                <p className="text-sm text-muted-foreground">Answer each question in complete sentences.</p>
                {quiz.shortAnswer.map((q) => (
                  <div key={q.number} className="space-y-2">
                    <p className="text-sm font-medium text-foreground">
                      <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {q.number}
                      </span>
                      {q.question}
                    </p>
                    <div className="ml-8 space-y-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="border-b border-muted-foreground/20 h-6" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Answer Key */}
            <div className="mt-8 border-t-2 border-dashed border-border pt-6">
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <CheckCircle className="h-5 w-5 text-secondary" /> Teacher Answer Key
              </h3>

              {quiz.multipleChoice.length > 0 && (
                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Multiple Choice</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {quiz.multipleChoice.map((q) => (
                      <div key={q.number} className="flex gap-1.5 text-sm">
                        <span className="font-bold text-primary">{q.number}.</span>
                        <span className="font-medium text-foreground">{q.correctAnswer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {quiz.shortAnswer.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Short Answer</h4>
                  <div className="space-y-2">
                    {quiz.shortAnswer.map((q) => (
                      <div key={q.number} className="flex gap-2 text-sm">
                        <span className="font-bold text-primary min-w-[2rem]">{q.number}.</span>
                        <span className="text-foreground">{q.sampleAnswer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizGenerator;
