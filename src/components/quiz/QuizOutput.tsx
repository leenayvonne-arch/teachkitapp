import { CheckCircle } from "lucide-react";
import type { Quiz } from "@/pages/dashboard/QuizGenerator";

interface Props {
  quiz: Quiz;
  gradeLevel: string;
  subject: string;
  topic: string;
  elementId?: string;
}

const QuizOutput = ({ quiz, gradeLevel, subject, topic, elementId = "quiz-output" }: Props) => {
  const totalQuestions =
    quiz.multipleChoice.length +
    (quiz.trueFalse?.length || 0) +
    (quiz.fillInTheBlank?.length || 0) +
    quiz.shortAnswer.length +
    (quiz.showYourWork?.length || 0);
  let sectionNum = 0;

  return (
    <div id={elementId} className="rounded-2xl border bg-white dark:bg-card shadow-sm" style={{ maxWidth: 816, margin: "0 auto", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <div className="px-12 py-10">
        {/* Header */}
        <div className="rounded-lg bg-muted/30 px-5 py-4 border-b-2 border-foreground/20 text-center">
          <span className="inline-block rounded bg-primary/10 px-2.5 py-0.5 font-sans text-xs font-semibold text-primary">
            {subject}
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-foreground">{quiz.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Grade: {gradeLevel} &nbsp;•&nbsp; Topic: {topic}
          </p>
          <p className="mt-1 text-xs text-muted-foreground italic">
            ⏱ Estimated completion time: ~{Math.max(5, Math.round(totalQuestions * 1.5))} minutes
          </p>
          <div className="mx-auto mt-4 flex max-w-lg justify-between text-sm text-muted-foreground">
            <span>Name: ______________________</span>
            <span>Date: _______________</span>
          </div>
        </div>

        {/* Multiple Choice */}
        {quiz.multipleChoice.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="rounded-md bg-muted/20 px-4 py-2 font-display text-lg font-semibold text-foreground border-b border-border">
              Section {++sectionNum}: Multiple Choice
            </h3>
            <p className="text-sm text-muted-foreground italic px-1">Choose the best answer for each question.</p>
            {quiz.multipleChoice.map((q) => (
              <div key={q.number} className="rounded-md border border-border/40 px-5 py-4 space-y-3">
                <p className="text-sm font-medium text-foreground">
                  <span className="mr-2 font-bold">{q.number})</span>
                  {q.question}
                </p>
                <div className="ml-7 grid gap-2 sm:grid-cols-2">
                  {(["A", "B", "C", "D"] as const).map((letter) => (
                    <div key={letter} className="flex items-start gap-2 text-sm">
                      <span className="font-bold text-muted-foreground">{letter}.</span>
                      <span className="text-foreground">{q.options[letter]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* True / False */}
        {quiz.trueFalse && quiz.trueFalse.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="rounded-md bg-muted/20 px-4 py-2 font-display text-lg font-semibold text-foreground border-b border-border">
              Section {++sectionNum}: True / False
            </h3>
            <p className="text-sm text-muted-foreground italic px-1">Write "True" or "False" for each statement.</p>
            {quiz.trueFalse.map((q) => (
              <div key={q.number} className="rounded-md border border-border/40 px-5 py-4 flex items-start gap-3">
                <span className="font-bold text-foreground text-sm">{q.number})</span>
                <p className="text-sm font-medium text-foreground flex-1">{q.question}</p>
                <span className="text-sm text-muted-foreground shrink-0 w-24 border-b border-muted-foreground/25">&nbsp;</span>
              </div>
            ))}
          </div>
        )}

        {/* Fill in the Blank */}
        {quiz.fillInTheBlank && quiz.fillInTheBlank.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="rounded-md bg-muted/20 px-4 py-2 font-display text-lg font-semibold text-foreground border-b border-border">
              Section {++sectionNum}: Fill in the Blank
            </h3>
            <p className="text-sm text-muted-foreground italic px-1">Write the correct word or phrase in the blank.</p>
            {quiz.fillInTheBlank.map((q) => (
              <div key={q.number} className="rounded-md border border-border/40 px-5 py-4 flex items-start gap-3">
                <span className="font-bold text-foreground text-sm">{q.number})</span>
                <p className="text-sm font-medium text-foreground flex-1">{q.question}</p>
              </div>
            ))}
          </div>
        )}

        {/* Short Answer */}
        {quiz.shortAnswer.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="rounded-md bg-muted/20 px-4 py-2 font-display text-lg font-semibold text-foreground border-b border-border">
              Section {++sectionNum}: Short Answer
            </h3>
            <p className="text-sm text-muted-foreground italic px-1">Answer each question in complete sentences.</p>
            {quiz.shortAnswer.map((q) => (
              <div key={q.number} className="rounded-md border border-border/40 px-5 py-4 space-y-2">
                <p className="text-sm font-medium text-foreground">
                  <span className="mr-2 font-bold">{q.number})</span>
                  {q.question}
                </p>
                <div className="ml-7 space-y-3 mt-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="border-b border-muted-foreground/25 h-5" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show Your Work */}
        {quiz.showYourWork && quiz.showYourWork.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="rounded-md bg-muted/20 px-4 py-2 font-display text-lg font-semibold text-foreground border-b border-border">
              Section {++sectionNum}: Show Your Work
            </h3>
            <p className="text-sm text-muted-foreground italic px-1">Show all work, steps, or reasoning to receive full credit.</p>
            {quiz.showYourWork.map((q) => (
              <div key={q.number} className="rounded-md border border-border/40 px-5 py-4 space-y-2">
                <p className="text-sm font-medium text-foreground">
                  <span className="mr-2 font-bold">{q.number})</span>
                  {q.question}
                </p>
                <div className="ml-7 mt-3 border border-dashed border-muted-foreground/30 rounded-md h-32 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground/40 italic">Work space</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 flex items-center justify-between border-t border-foreground/10 pt-3">
          <span className="text-[10px] text-muted-foreground/50">© TeachKit</span>
          <span className="text-[10px] text-muted-foreground/50">Page 1</span>
        </div>
      </div>

      {/* Answer Key */}
      <div className="border-t-2 border-dashed border-border px-12 py-10">
        <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-foreground">
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
        {quiz.trueFalse && quiz.trueFalse.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">True / False</h4>
            <div className="grid grid-cols-5 gap-2">
              {quiz.trueFalse.map((q) => (
                <div key={q.number} className="flex gap-1.5 text-sm">
                  <span className="font-bold text-primary">{q.number}.</span>
                  <span className="font-medium text-foreground">{q.correctAnswer}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {quiz.fillInTheBlank && quiz.fillInTheBlank.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Fill in the Blank</h4>
            <div className="grid grid-cols-5 gap-2">
              {quiz.fillInTheBlank.map((q) => (
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
        {quiz.showYourWork && quiz.showYourWork.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Show Your Work</h4>
            <div className="space-y-2">
              {quiz.showYourWork.map((q) => (
                <div key={q.number} className="flex gap-2 text-sm">
                  <span className="font-bold text-primary min-w-[2rem]">{q.number}.</span>
                  <span className="text-foreground">{q.sampleAnswer}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-8 flex items-center justify-between border-t border-foreground/10 pt-3">
          <span className="text-[10px] text-muted-foreground/50">© TeachKit</span>
          <span className="text-[10px] text-muted-foreground/50">Answer Key</span>
        </div>
      </div>
    </div>
  );
};

export default QuizOutput;
