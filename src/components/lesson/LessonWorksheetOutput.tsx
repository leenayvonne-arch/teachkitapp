import { Button } from "@/components/ui/button";
import { Save, Download, CheckCircle } from "lucide-react";
import { saveResource, downloadElementAsPDF } from "@/lib/resourceUtils";
import type { LessonPlan, LessonWorksheet } from "@/pages/dashboard/LessonPlanGenerator";

interface Props {
  worksheet: LessonWorksheet;
  lessonPlan: LessonPlan;
}

const LessonWorksheetOutput = ({ worksheet, lessonPlan }: Props) => {
  const handleSave = async () => {
    await saveResource({
      title: worksheet.title,
      resourceType: "worksheet",
      gradeLevel: lessonPlan.gradeLevel,
      subject: lessonPlan.subject,
      topic: lessonPlan.topic,
      content: worksheet as unknown as Record<string, unknown>,
    });
  };

  const handleDownloadPDF = () =>
    downloadElementAsPDF("lesson-worksheet-output", worksheet.title || "worksheet");

  return (
    <div>
      <h2 className="mb-3 font-display text-xl font-bold text-foreground">Generated Worksheet</h2>

      <div className="mb-4 flex flex-wrap gap-2">
        <Button variant="outline" className="rounded-xl" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Save Worksheet
        </Button>
        <Button variant="outline" className="rounded-xl" onClick={handleDownloadPDF}>
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
      </div>

      <div id="lesson-worksheet-output" className="rounded-2xl border bg-card p-8 space-y-8">
        {/* Header */}
        <div className="border-b border-border pb-6 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">{worksheet.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Grade: {lessonPlan.gradeLevel} &nbsp;•&nbsp; Subject: {lessonPlan.subject} &nbsp;•&nbsp; Topic: {lessonPlan.topic}
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
                      <span className="mr-2 font-medium text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
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
    </div>
  );
};

export default LessonWorksheetOutput;
