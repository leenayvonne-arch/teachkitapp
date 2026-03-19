import { Button } from "@/components/ui/button";
import { Save, Download, CheckCircle, Printer, GraduationCap } from "lucide-react";
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

      <div id="lesson-worksheet-output" className="rounded-2xl border bg-card shadow-lg print:shadow-none print:border-0 print:bg-white" style={{ maxWidth: 816, margin: "0 auto", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
        {/* Page 1 */}
        <div className="px-[0.75in] py-[0.6in]">
          {/* Premium Header Bar */}
          <div className="rounded-lg border border-border/60" style={{ background: "linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--muted)/0.4) 100%)" }}>
            <div className="flex items-center justify-between px-6 pt-2 pb-0">
              <span className="flex items-center gap-1 font-sans text-[9px] font-semibold tracking-[0.15em] uppercase text-muted-foreground/50"><GraduationCap className="h-3 w-3" />TeachKit</span>
            </div>
            <div className="flex items-start justify-between gap-4 px-6 pb-5 pt-1">
              <div className="space-y-2">
                <span className="inline-block rounded-full px-3 py-1 font-sans text-[11px] font-bold tracking-wide uppercase" style={{ background: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" }}>
                  {lessonPlan.subject}
                </span>
                <h2 className="text-[22px] font-bold leading-tight text-foreground tracking-tight">{worksheet.title}</h2>
                <p className="text-xs text-muted-foreground tracking-wide">
                  Grade {lessonPlan.gradeLevel} &nbsp;•&nbsp; {lessonPlan.topic}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 pt-1 text-[13px] text-foreground/70 whitespace-nowrap">
                <div>Name: <span className="inline-block border-b border-foreground/40" style={{ width: 200 }}>&nbsp;</span></div>
                <div>Date: <span className="inline-block border-b border-foreground/40" style={{ width: 140 }}>&nbsp;</span></div>
              </div>
            </div>
          </div>

          {/* Directions */}
          <div className="mt-7 rounded-md border border-border/50 px-5 py-3.5" style={{ background: "hsl(var(--muted)/0.25)" }}>
            <p className="text-[13px] leading-relaxed text-foreground/80">
              <span className="font-bold text-foreground">Directions:</span>{" "}
              <span className="italic">{worksheet.instructions}</span>
            </p>
          </div>

          {/* Questions */}
          <div className="mt-8 space-y-5">
            {worksheet.questions.map((q) => (
              <div key={q.number} className="rounded-lg border border-border/40 px-5 py-4" style={{ background: "hsl(var(--muted)/0.08)" }}>
                <p className="text-[14px] leading-relaxed text-foreground">
                  <span className="mr-2.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold" style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" }}>{q.number}</span>
                  {q.question}
                </p>

                {q.responseType === "multiple_choice" && q.options.length > 0 && (
                  <div className="ml-9 mt-3 space-y-1.5">
                    {q.options.map((opt, i) => (
                      <p key={i} className="text-[13px] text-foreground">
                        <span className="mr-2 inline-block w-5 font-semibold text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </p>
                    ))}
                  </div>
                )}

                {q.responseType === "fill_in_blank" && (
                  <div className="ml-9 mt-4 space-y-4">
                    <div className="border-b border-foreground/20" style={{ height: 20 }} />
                  </div>
                )}

                {(q.responseType === "short_answer" || q.responseType === "open_ended") && (
                  <div className="ml-9 mt-4 space-y-4">
                    {Array.from({ length: q.linesForResponse || 3 }).map((_, i) => (
                      <div key={i} className="border-b border-foreground/15" style={{ height: 20 }} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-10 flex items-center justify-between border-t-2 border-border/30 pt-3">
            <span className="font-sans text-[10px] font-medium text-muted-foreground/60 tracking-wide">© TeachKit Resource Shop</span>
            <span className="font-sans text-[10px] font-medium text-muted-foreground/60">Page 1 of 2</span>
          </div>
        </div>

        {/* Answer Key — Page 2 */}
        <div className="border-t-2 border-dashed border-border/50 px-[0.75in] py-[0.6in]">
          <div className="mb-6 flex items-center gap-2.5 rounded-lg px-5 py-3" style={{ background: "hsl(var(--secondary)/0.08)", border: "1px solid hsl(var(--secondary)/0.2)" }}>
            <CheckCircle className="h-5 w-5" style={{ color: "hsl(var(--secondary))" }} />
            <h3 className="text-lg font-bold text-foreground tracking-tight">Answer Key</h3>
          </div>
          <div className="space-y-2.5 pl-2">
            {worksheet.answerKey.map((a) => (
              <div key={a.number} className="flex gap-3 text-[13px]">
                <span className="font-bold min-w-[2rem]" style={{ color: "hsl(var(--primary))" }}>{a.number}.</span>
                <span className="text-foreground">{a.answer}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-between border-t-2 border-border/30 pt-3">
            <span className="font-sans text-[10px] font-medium text-muted-foreground/60 tracking-wide">© TeachKit Resource Shop</span>
            <span className="font-sans text-[10px] font-medium text-muted-foreground/60">Page 2 of 2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonWorksheetOutput;
