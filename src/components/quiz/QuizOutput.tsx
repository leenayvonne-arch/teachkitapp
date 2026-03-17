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
    quiz.shortAnswer.length;
  let sectionNum = 0;

  return (
    <div id={elementId} className="rounded-2xl border bg-card p-8 space-y-8">
      {/* Header */}
      <div className="border-b border-border pb-6 text-center">
        <h2 className="font-display text-2xl font-bold text-foreground">{quiz.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Grade: {gradeLevel} &nbsp;•&nbsp; Subject: {subject} &nbsp;•&nbsp; Topic: {topic}
        </p>
        <p className="mt-1 text-xs text-muted-foreground italic">
          ⏱ Estimated completion time: ~{Math.max(5, Math.round(totalQuestions * 1.5))} minutes
        </p>
        <div className="mx-auto mt-4 flex max-w-lg justify-between text-sm text-muted-foreground">
          <span>Name: ______________________</span>
          <span>Date: _______________</span>
          <span>Subject: {subject}</span>
        </div>
      </div>

      {/* Multiple Choice */}
      {quiz.multipleChoice.length > 0 && (
        <div className="space-y-6">
          <h3 className="font-display text-lg font-semibold text-foreground border-b border-border pb-2">
            Section {++sectionNum}: Multiple Choice
          </h3>
          <p className="text-sm text-muted-foreground">Choose the best answer for each question.</p>
          {quiz.multipleChoice.map((q) => (
            <div key={q.number} className="space-y-3">
              <p className="text-sm font-medium text-foreground">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{q.number}</span>
                {q.question}
              </p>
              <div className="ml-8 grid gap-2 sm:grid-cols-2">
                {(["A", "B", "C", "D"] as const).map((letter) => (
                  <div key={letter} className="flex items-start gap-2 rounded-lg border border-border p-2.5 text-sm">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/30 text-xs font-bold text-primary">{letter}</span>
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
        <div className="space-y-6">
          <h3 className="font-display text-lg font-semibold text-foreground border-b border-border pb-2">
            Section {++sectionNum}: True / False
          </h3>
          <p className="text-sm text-muted-foreground">Write "True" or "False" for each statement.</p>
          {quiz.trueFalse.map((q) => (
            <div key={q.number} className="flex items-start gap-3">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{q.number}</span>
              <p className="text-sm font-medium text-foreground flex-1">{q.question}</p>
              <span className="text-sm text-muted-foreground shrink-0 w-24 border-b border-muted-foreground/20">&nbsp;</span>
            </div>
          ))}
        </div>
      )}

      {/* Fill in the Blank */}
      {quiz.fillInTheBlank && quiz.fillInTheBlank.length > 0 && (
        <div className="space-y-6">
          <h3 className="font-display text-lg font-semibold text-foreground border-b border-border pb-2">
            Section {++sectionNum}: Fill in the Blank
          </h3>
          <p className="text-sm text-muted-foreground">Write the correct word or phrase in the blank.</p>
          {quiz.fillInTheBlank.map((q) => (
            <div key={q.number} className="flex items-start gap-3">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{q.number}</span>
              <p className="text-sm font-medium text-foreground flex-1">{q.question}</p>
            </div>
          ))}
        </div>
      )}

      {/* Short Answer */}
      {quiz.shortAnswer.length > 0 && (
        <div className="space-y-6">
          <h3 className="font-display text-lg font-semibold text-foreground border-b border-border pb-2">
            Section {++sectionNum}: Short Answer
          </h3>
          <p className="text-sm text-muted-foreground">Answer each question in complete sentences.</p>
          {quiz.shortAnswer.map((q) => (
            <div key={q.number} className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{q.number}</span>
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
      </div>
    </div>
  );
};

export default QuizOutput;
