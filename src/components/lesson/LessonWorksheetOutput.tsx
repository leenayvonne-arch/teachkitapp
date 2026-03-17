import { Button } from "@/components/ui/button";
import { Save, Download, CheckCircle, Printer } from "lucide-react";
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
        <Button variant="outline" className="rounded-xl" onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" /> Print
        </Button>
      </div>

      <div id="lesson-worksheet-output" className="rounded-2xl border bg-white dark:bg-card shadow-sm" style={{ maxWidth: 816, margin: "0 auto", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
        {/* Page with print margins */}
        <div className="px-12 py-10">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 rounded-lg bg-muted/30 px-5 py-4 border-b-2 border-foreground/20">
            <div>
              <span className="inline-block rounded bg-primary/10 px-2.5 py-0.5 font-sans text-xs font-semibold text-primary">
                {lessonPlan.subject}
              </span>
              <h2 className="mt-2 text-xl font-bold text-foreground">{worksheet.title}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Grade {lessonPlan.gradeLevel} &nbsp;•&nbsp; {lessonPlan.topic}
              </p>
            </div>
            <div className="text-right text-sm text-muted-foreground whitespace-nowrap">
              <div>Name: ________________________________</div>
              <div className="mt-1.5">Date: ___________________</div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 rounded-lg border border-border bg-muted/20 px-5 py-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">Directions:</span>{" "}
              <span className="italic">{worksheet.instructions}</span>
            </p>
          </div>

          {/* Questions */}
          <div className="mt-8 space-y-4">
            {worksheet.questions.map((q, idx) => (
              <div key={q.number} className="rounded-md border border-border/40 px-5 py-4">
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

        {/* Answer Key — separate "page" */}
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
    </div>
  );
};

export default LessonWorksheetOutput;
