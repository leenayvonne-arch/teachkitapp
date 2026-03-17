import { Button } from "@/components/ui/button";
import { Save, Download, CheckCircle } from "lucide-react";
import { saveResource, downloadElementAsPDF } from "@/lib/resourceUtils";
import type { LessonPlan, LessonQuiz } from "@/pages/dashboard/LessonPlanGenerator";

interface Props {
  quiz: LessonQuiz;
  lessonPlan: LessonPlan;
}

const LessonQuizOutput = ({ quiz, lessonPlan }: Props) => {
  const handleSave = async () => {
    await saveResource({
      title: quiz.title,
      resourceType: "quiz",
      gradeLevel: lessonPlan.gradeLevel,
      subject: lessonPlan.subject,
      topic: lessonPlan.topic,
      content: quiz as unknown as Record<string, unknown>,
    });
  };

  const handleDownloadPDF = () =>
    downloadElementAsPDF("lesson-quiz-output", quiz.title || "quiz");

  return (
    <div>
      <h2 className="mb-3 font-display text-xl font-bold text-foreground">Generated Quiz</h2>

      <div className="mb-4 flex flex-wrap gap-2">
        <Button variant="outline" className="rounded-xl" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Save Quiz
        </Button>
        <Button variant="outline" className="rounded-xl" onClick={handleDownloadPDF}>
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
      </div>

      <div id="lesson-quiz-output" className="rounded-2xl border bg-card p-8 space-y-8">
        {/* Header */}
        <div className="border-b border-border pb-6 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">{quiz.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Grade: {lessonPlan.gradeLevel} &nbsp;•&nbsp; Subject: {lessonPlan.subject} &nbsp;•&nbsp; Topic: {lessonPlan.topic}
          </p>
          <div className="mx-auto mt-4 flex max-w-lg justify-between text-sm text-muted-foreground">
            <span>Name: ______________________</span>
            <span>Date: _______________</span>
            <span>Subject: {lessonPlan.subject}</span>
          </div>
        </div>

        {/* Multiple Choice */}
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

        {/* Short Answer */}
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
    </div>
  );
};

export default LessonQuizOutput;
