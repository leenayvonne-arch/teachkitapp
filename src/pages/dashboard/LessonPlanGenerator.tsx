import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Download, Save, FileText, HelpCircle, BookOpen, Clock, Target, Lightbulb, Users, CheckCircle, List, Sparkles } from "lucide-react";
import { saveResource, downloadElementAsPDF } from "@/lib/resourceUtils";
import TopicSuggestions from "@/components/TopicSuggestions";
import LessonPlanOutput from "@/components/lesson/LessonPlanOutput";
import LessonWorksheetOutput from "@/components/lesson/LessonWorksheetOutput";
import LessonQuizOutput from "@/components/lesson/LessonQuizOutput";
import RegenerateOptions, { type RegenerateAction } from "@/components/lesson/RegenerateOptions";
import LessonDifferentiationPanel, { type LessonDiffLevel } from "@/components/lesson/LessonDifferentiationPanel";
import LessonVersionTabs from "@/components/lesson/LessonVersionTabs";

export interface LessonPlan {
  lessonTitle: string;
  gradeLevel: string;
  subject: string;
  topic: string;
  duration: string;
  standards: string[];
  objectives: string[];
  keyVocabulary: { term: string; definition: string }[];
  materials: string[];
  instructionalStrategies: string[];
  procedures: {
    hook: { duration: string; description: string; activities: string[] };
    instruction: { duration: string; description: string; activities: string[] };
    guidedPractice: { duration: string; description: string; activities: string[] };
    independentPractice: { duration: string; description: string; activities: string[] };
    closure: { duration: string; description: string; activities: string[] };
  };
  differentiation: {
    belowLevel: string[];
    onLevel: string[];
    aboveLevel: string[];
  };
  exitTicket: {
    prompt: string;
    questions: string[];
  };
}

export interface LessonWorksheet {
  title: string;
  instructions: string;
  questions: {
    number: number;
    question: string;
    responseType: "short_answer" | "multiple_choice" | "fill_in_blank" | "open_ended";
    options: string[];
    linesForResponse: number;
  }[];
  answerKey: { number: number; answer: string }[];
}

export interface LessonQuiz {
  title: string;
  multipleChoice: {
    number: number;
    question: string;
    options: { A: string; B: string; C: string; D: string };
    correctAnswer: string;
  }[];
  shortAnswer: {
    number: number;
    question: string;
    sampleAnswer: string;
  }[];
  answerKey: {
    number: number;
    section: "multiple_choice" | "short_answer";
    answer: string;
  }[];
}

const GRADES = ["K", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
const DURATIONS = ["30 minutes", "45 minutes", "60 minutes", "90 minutes", "120 minutes"];
const DIFF_LEVELS = ["Basic", "Intermediate", "Advanced", "Mixed"];
const STYLES = ["Direct Instruction", "Inquiry-Based", "Project-Based", "Flipped Classroom", "Cooperative Learning", "Socratic Method"];

const LessonPlanGenerator = () => {
  const [gradeLevel, setGradeLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [classDuration, setClassDuration] = useState("");
  const [standards, setStandards] = useState("");
  const [objectives, setObjectives] = useState("");
  const [differentiationLevel, setDifferentiationLevel] = useState("");
  const [studentNeeds, setStudentNeeds] = useState("");
  const [instructionalStyle, setInstructionalStyle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null);

  // Derived generators
  const [isGeneratingWorksheet, setIsGeneratingWorksheet] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [worksheet, setWorksheet] = useState<LessonWorksheet | null>(null);
  const [quiz, setQuiz] = useState<LessonQuiz | null>(null);

  // Regenerate state
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regenAction, setRegenAction] = useState<RegenerateAction | null>(null);
  const [isRegeneratingWorksheet, setIsRegeneratingWorksheet] = useState(false);
  const [regenWorksheetAction, setRegenWorksheetAction] = useState<RegenerateAction | null>(null);
  const [isRegeneratingQuiz, setIsRegeneratingQuiz] = useState(false);
  const [regenQuizAction, setRegenQuizAction] = useState<RegenerateAction | null>(null);

  // Differentiation state
  const [diffVersions, setDiffVersions] = useState<{ level: LessonDiffLevel; lessonPlan: LessonPlan }[]>([]);
  const [isDiffGenerating, setIsDiffGenerating] = useState(false);
  const [diffGeneratingLevel, setDiffGeneratingLevel] = useState<LessonDiffLevel | null>(null);
  const [activeDiffTab, setActiveDiffTab] = useState<LessonDiffLevel>("simplified");

  const handleGenerate = async (regenerateAction?: RegenerateAction) => {
    if (!gradeLevel || !subject || !topic) {
      toast({ title: "Missing fields", description: "Please fill in Grade Level, Subject, and Topic.", variant: "destructive" });
      return;
    }

    const isRegen = !!regenerateAction;
    if (isRegen) { setIsRegenerating(true); setRegenAction(regenerateAction!); }
    else { setIsGenerating(true); }
    if (!isRegen) { setWorksheet(null); setQuiz(null); setDiffVersions([]); }

    try {
      const { data, error } = await supabase.functions.invoke("generate-lesson", {
        body: { gradeLevel, subject, topic, lessonTitle, classDuration, standards, objectives, differentiationLevel, studentNeeds, instructionalStyle, regenerateAction },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setLessonPlan(data.lessonPlan);
      toast({ title: isRegen ? "Lesson plan regenerated!" : "Lesson plan generated!", description: "Scroll down to view your lesson plan." });
    } catch (e: any) {
      console.error(e);
      toast({ title: "Generation failed", description: e.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
      setIsRegenerating(false);
      setRegenAction(null);
    }
  };

  const handleGenerateWorksheet = async (regenerateAction?: RegenerateAction) => {
    if (!lessonPlan) return;
    const isRegen = !!regenerateAction;
    if (isRegen) { setIsRegeneratingWorksheet(true); setRegenWorksheetAction(regenerateAction!); }
    else { setIsGeneratingWorksheet(true); }
    try {
      const { data, error } = await supabase.functions.invoke("generate-worksheet", {
        body: {
          gradeLevel: lessonPlan.gradeLevel,
          subject: lessonPlan.subject,
          topic: `${lessonPlan.topic} — Key concepts: ${lessonPlan.objectives.join("; ")}`,
          numberOfQuestions: "10",
          difficultyLevel: "Mixed",
          regenerateAction,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setWorksheet(data.worksheet);
      toast({ title: isRegen ? "Worksheet regenerated!" : "Worksheet generated!" });
    } catch (e: any) {
      console.error(e);
      toast({ title: "Worksheet generation failed", description: e.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setIsGeneratingWorksheet(false);
      setIsRegeneratingWorksheet(false);
      setRegenWorksheetAction(null);
    }
  };

  const handleGenerateQuiz = async (regenerateAction?: RegenerateAction) => {
    if (!lessonPlan) return;
    const isRegen = !!regenerateAction;
    if (isRegen) { setIsRegeneratingQuiz(true); setRegenQuizAction(regenerateAction!); }
    else { setIsGeneratingQuiz(true); }
    try {
      const { data, error } = await supabase.functions.invoke("generate-quiz", {
        body: {
          gradeLevel: lessonPlan.gradeLevel,
          subject: lessonPlan.subject,
          topic: `${lessonPlan.topic} — Key concepts: ${lessonPlan.objectives.join("; ")}`,
          numberOfQuestions: "10",
          regenerateAction,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setQuiz(data.quiz);
      toast({ title: isRegen ? "Quiz regenerated!" : "Quiz generated!" });
    } catch (e: any) {
      console.error(e);
      toast({ title: "Quiz generation failed", description: e.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setIsGeneratingQuiz(false);
      setIsRegeneratingQuiz(false);
      setRegenQuizAction(null);
    }
  };

  const handleSave = async () => {
    if (!lessonPlan) return;
    await saveResource({
      title: lessonPlan.lessonTitle,
      resourceType: "lesson",
      gradeLevel: lessonPlan.gradeLevel,
      subject: lessonPlan.subject,
      topic: lessonPlan.topic,
      content: lessonPlan as unknown as Record<string, unknown>,
    });
  };

  const handleDownloadPDF = () => downloadElementAsPDF("lesson-plan-output", lessonPlan?.lessonTitle || "lesson-plan");

  const handleDifferentiate = async (level: LessonDiffLevel) => {
    if (!lessonPlan) return;
    setIsDiffGenerating(true);
    setDiffGeneratingLevel(level);
    try {
      const { data, error } = await supabase.functions.invoke("generate-lesson", {
        body: {
          gradeLevel: lessonPlan.gradeLevel,
          subject: lessonPlan.subject,
          topic: lessonPlan.topic,
          lessonTitle: lessonPlan.lessonTitle,
          classDuration: lessonPlan.duration,
          standards: lessonPlan.standards.join("; "),
          objectives: lessonPlan.objectives.join("; "),
          differentiationLevel: level,
          studentNeeds,
          instructionalStyle,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      const newVersion = { level, lessonPlan: data.lessonPlan as LessonPlan };
      setDiffVersions((prev) => {
        const filtered = prev.filter((v) => v.level !== level);
        return [...filtered, newVersion];
      });
      setActiveDiffTab(level);
      toast({ title: "Differentiated lesson generated!", description: `${level.charAt(0).toUpperCase() + level.slice(1)} version is ready.` });
    } catch (e: any) {
      console.error(e);
      toast({ title: "Generation failed", description: e.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setIsDiffGenerating(false);
      setDiffGeneratingLevel(null);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-1 font-display text-2xl font-bold text-foreground">Lesson Plan Generator</h1>
      <p className="mb-8 text-muted-foreground">Create a complete, standards-aligned lesson plan powered by AI.</p>

      {/* ── INPUT FORM ── */}
      <Card className="mb-8 rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5 text-primary" />
            Lesson Information
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
              <Label>Lesson Title <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Input value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} placeholder="Auto-generated if blank" className="mt-1 rounded-xl" />
            </div>
            <div>
              <Label>Class Duration</Label>
              <Select value={classDuration} onValueChange={setClassDuration}>
                <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="45 minutes" /></SelectTrigger>
                <SelectContent>
                  {DURATIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
              <Target className="h-4 w-4 text-primary" /> Standards &amp; Objectives
            </h3>
            <div className="space-y-4">
              <div>
                <Label>Standards Alignment <span className="text-muted-foreground text-xs">(optional — auto-generated if blank)</span></Label>
                <Textarea value={standards} onChange={(e) => setStandards(e.target.value)} placeholder="e.g. CCSS.MATH.CONTENT.4.NF.A.1" className="mt-1 rounded-xl" rows={2} />
              </div>
              <div>
                <Label>Learning Objectives <span className="text-muted-foreground text-xs">(optional — auto-generated if blank)</span></Label>
                <Textarea value={objectives} onChange={(e) => setObjectives(e.target.value)} placeholder="e.g. Students will be able to identify equivalent fractions…" className="mt-1 rounded-xl" rows={2} />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
              <Users className="h-4 w-4 text-primary" /> Additional Settings
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Differentiation Level</Label>
                <Select value={differentiationLevel} onValueChange={setDifferentiationLevel}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Select level" /></SelectTrigger>
                  <SelectContent>
                    {DIFF_LEVELS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Instructional Style</Label>
                <Select value={instructionalStyle} onValueChange={setInstructionalStyle}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Select style" /></SelectTrigger>
                  <SelectContent>
                    {STYLES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <Label>Student Needs <span className="text-muted-foreground text-xs">(IEP, ELL, advanced learners)</span></Label>
                <Textarea value={studentNeeds} onChange={(e) => setStudentNeeds(e.target.value)} placeholder="Describe any specific student accommodations…" className="mt-1 rounded-xl" rows={2} />
              </div>
            </div>
          </div>

          <Button onClick={() => handleGenerate()} disabled={isGenerating} className="w-full rounded-xl" size="lg">
            {isGenerating ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Lesson Plan…</>
            ) : (
              <><Sparkles className="mr-2 h-4 w-4" /> Generate Lesson Plan</>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* ── OUTPUT ── */}
      {lessonPlan && (
        <>
          {/* Action buttons */}
          <div className="mb-4 flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-xl" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Save Lesson
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => handleGenerateWorksheet()}
              disabled={isGeneratingWorksheet}
            >
              {isGeneratingWorksheet ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…</>
              ) : (
                <><FileText className="mr-2 h-4 w-4" /> Generate Worksheet</>
              )}
            </Button>
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => handleGenerateQuiz()}
              disabled={isGeneratingQuiz}
            >
              {isGeneratingQuiz ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…</>
              ) : (
                <><HelpCircle className="mr-2 h-4 w-4" /> Generate Quiz</>
              )}
            </Button>
          </div>

          {/* Lesson Regenerate Options */}
          <div className="mb-4">
            <RegenerateOptions
              onAction={(action) => handleGenerate(action)}
              isLoading={isRegenerating}
              loadingAction={regenAction}
            />
          </div>

          <LessonPlanOutput lessonPlan={lessonPlan} />

          {/* Differentiation Panel */}
          <div className="mt-8">
            <LessonDifferentiationPanel
              onDifferentiate={handleDifferentiate}
              generatedVersions={diffVersions.map((v) => v.level)}
              isGenerating={isDiffGenerating}
              generatingLevel={diffGeneratingLevel}
            />
          </div>

          {/* Differentiated Versions */}
          {diffVersions.length > 0 && (
            <div className="mt-8">
              <LessonVersionTabs
                versions={diffVersions}
                activeTab={activeDiffTab}
                onTabChange={setActiveDiffTab}
              />
            </div>
          )}

          {/* Derived Worksheet */}
          {worksheet && (
            <div className="mt-8 space-y-4">
              <LessonWorksheetOutput worksheet={worksheet} lessonPlan={lessonPlan} />
              <RegenerateOptions
                onAction={(action) => handleGenerateWorksheet(action)}
                isLoading={isRegeneratingWorksheet}
                loadingAction={regenWorksheetAction}
                showAddQuestions
              />
            </div>
          )}

          {/* Derived Quiz */}
          {quiz && (
            <div className="mt-8 space-y-4">
              <LessonQuizOutput quiz={quiz} lessonPlan={lessonPlan} />
              <RegenerateOptions
                onAction={(action) => handleGenerateQuiz(action)}
                isLoading={isRegeneratingQuiz}
                loadingAction={regenQuizAction}
                showAddQuestions
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LessonPlanGenerator;
