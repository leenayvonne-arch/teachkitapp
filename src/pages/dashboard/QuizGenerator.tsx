import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Download, Save, HelpCircle, Sparkles, SlidersHorizontal } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { saveResource, downloadElementAsPDF } from "@/lib/resourceUtils";
import RegenerateOptions, { type RegenerateAction } from "@/components/lesson/RegenerateOptions";
import QuizOutput from "@/components/quiz/QuizOutput";

export interface TFQuestion {
  number: number;
  question: string;
  correctAnswer: "True" | "False";
}

export interface MCQuestion {
  number: number;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
}

export interface SAQuestion {
  number: number;
  question: string;
  sampleAnswer: string;
}

export interface FITBQuestion {
  number: number;
  question: string;
  correctAnswer: string;
}

export interface Quiz {
  title: string;
  multipleChoice: MCQuestion[];
  trueFalse: TFQuestion[];
  fillInTheBlank: FITBQuestion[];
  shortAnswer: SAQuestion[];
  answerKey: { number: number; section: "multiple_choice" | "true_false" | "fill_in_the_blank" | "short_answer"; answer: string }[];
}

const GRADES = ["K", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
const QUESTION_COUNTS = ["5", "10", "15", "20", "25", "30", "40", "50"];

const QuizGenerator = () => {
  const [gradeLevel, setGradeLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("10");
  const [useCustomSplit, setUseCustomSplit] = useState(false);
  const [mcPercent, setMcPercent] = useState(40);
  const [tfPercent, setTfPercent] = useState(20);
  const [fitbPercent, setFitbPercent] = useState(20);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regenAction, setRegenAction] = useState<RegenerateAction | null>(null);

  const saPercent = Math.max(0, 100 - mcPercent - tfPercent - fitbPercent);
  const total = Number(numberOfQuestions);

  const clampOthers = (mc: number, tf: number, fitb: number) => {
    const sum = mc + tf + fitb;
    if (sum > 100) {
      const excess = sum - 100;
      // Reduce SA first (implicit), then proportionally
      return { mc, tf, fitb: Math.max(0, fitb - excess) };
    }
    return { mc, tf, fitb };
  };

  const handleMcChange = (v: number) => {
    const { tf, fitb } = clampOthers(v, tfPercent, fitbPercent);
    setMcPercent(v); setTfPercent(tf); setFitbPercent(fitb);
  };
  const handleTfChange = (v: number) => {
    const { mc, fitb } = clampOthers(mcPercent, v, fitbPercent);
    setMcPercent(mc); setTfPercent(v); setFitbPercent(fitb);
  };
  const handleFitbChange = (v: number) => {
    const { mc, tf } = clampOthers(mcPercent, tfPercent, v);
    setMcPercent(mc); setTfPercent(tf); setFitbPercent(v);
  };

  const handleGenerate = async (regenerateAction?: RegenerateAction) => {
    if (!gradeLevel || !subject || !topic) {
      toast({ title: "Missing fields", description: "Please fill in Grade Level, Subject, and Topic.", variant: "destructive" });
      return;
    }

    const isRegen = !!regenerateAction;
    if (isRegen) { setIsRegenerating(true); setRegenAction(regenerateAction!); }
    else { setIsGenerating(true); }

    try {
      const { data, error } = await supabase.functions.invoke("generate-quiz", {
        body: {
          gradeLevel, subject, topic, numberOfQuestions, regenerateAction,
          mcPercent: useCustomSplit ? mcPercent : undefined,
          tfPercent: useCustomSplit ? tfPercent : undefined,
          fitbPercent: useCustomSplit ? fitbPercent : undefined,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      // Ensure trueFalse array exists for backward compat
      const quizData = data.quiz;
      if (!quizData.trueFalse) quizData.trueFalse = [];
      if (!quizData.fillInTheBlank) quizData.fillInTheBlank = [];
      setQuiz(quizData);
      toast({ title: isRegen ? "Quiz regenerated!" : "Quiz generated!" });
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
      <p className="mb-8 text-muted-foreground">Create structured quizzes with multiple choice, true/false, and short answer sections.</p>

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

          <div className="space-y-3 rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Custom Question Type Distribution</Label>
              </div>
              <Switch checked={useCustomSplit} onCheckedChange={setUseCustomSplit} />
            </div>
            {useCustomSplit && (
              <div className="space-y-4 pt-2">
                {/* MC slider */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Multiple Choice</span>
                    <span className="font-semibold text-foreground">{mcPercent}% <span className="font-normal text-muted-foreground">(≈{Math.round(total * mcPercent / 100)})</span></span>
                  </div>
                  <Slider value={[mcPercent]} onValueChange={([v]) => handleMcChange(v)} min={0} max={100} step={5} className="w-full" />
                </div>
                {/* TF slider */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">True / False</span>
                    <span className="font-semibold text-foreground">{tfPercent}% <span className="font-normal text-muted-foreground">(≈{Math.round(total * tfPercent / 100)})</span></span>
                  </div>
                  <Slider value={[tfPercent]} onValueChange={([v]) => handleTfChange(v)} min={0} max={100} step={5} className="w-full" />
                </div>
                {/* FITB slider */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Fill in the Blank</span>
                    <span className="font-semibold text-foreground">{fitbPercent}% <span className="font-normal text-muted-foreground">(≈{Math.round(total * fitbPercent / 100)})</span></span>
                  </div>
                  <Slider value={[fitbPercent]} onValueChange={([v]) => handleFitbChange(v)} min={0} max={100} step={5} className="w-full" />
                </div>
                {/* SA readout */}
                <div className="flex items-center justify-between text-sm rounded-lg bg-muted/50 px-3 py-2">
                  <span className="text-muted-foreground">Short Answer</span>
                  <span className="font-semibold text-foreground">{saPercent}% <span className="font-normal text-muted-foreground">(≈{total - Math.round(total * mcPercent / 100) - Math.round(total * tfPercent / 100) - Math.round(total * fitbPercent / 100)})</span></span>
                </div>
              </div>
            )}
          </div>

          {total >= 30 && (
            <p className="text-sm text-muted-foreground rounded-lg bg-muted/50 px-3 py-2">
              ℹ️ Larger quizzes may take a few extra seconds to generate.
            </p>
          )}

          <Button onClick={() => handleGenerate()} disabled={isGenerating} className="w-full rounded-xl" size="lg">
            {isGenerating ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Quiz…</>
            ) : (
              <><Sparkles className="mr-2 h-4 w-4" /> Generate Quiz</>
            )}
          </Button>
        </CardContent>
      </Card>

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

          <div className="mb-4">
            <RegenerateOptions
              onAction={(action) => handleGenerate(action)}
              isLoading={isRegenerating}
              loadingAction={regenAction}
              showAddQuestions
            />
          </div>

          <QuizOutput quiz={quiz} gradeLevel={gradeLevel} subject={subject} topic={topic} />
        </>
      )}
    </div>
  );
};

export default QuizGenerator;
