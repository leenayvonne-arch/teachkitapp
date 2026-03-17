import { Package, GraduationCap } from "lucide-react";
import { downloadElementAsPDF } from "@/lib/resourceUtils";
import { mathWorksheetData, mathWorksheetTopics } from "@/data/mathWorksheetMegaPack";

const topicColors: Record<string, string> = {
  Fractions: "bg-primary/10 text-primary border-primary/20",
  Geometry: "bg-secondary/10 text-secondary border-secondary/20",
  Measurement: "bg-accent/20 text-accent-foreground border-accent/20",
  "Word Problems": "bg-muted text-muted-foreground border-border",
};

const typeLabels: Record<string, string> = {
  short_answer: "Short Answer",
  multiple_choice: "Multiple Choice",
  fill_in_blank: "Fill in the Blank",
  open_ended: "Open Ended",
};

const typeBadgeColors: Record<string, string> = {
  short_answer: "bg-primary/10 text-primary",
  multiple_choice: "bg-secondary/10 text-secondary",
  fill_in_blank: "bg-accent/20 text-accent-foreground",
  open_ended: "bg-muted text-muted-foreground",
};

const MathWorksheetMegaPack = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Math Worksheet Mega Pack</h1>
        <p className="text-muted-foreground">50 printable math worksheets for Grades 3–5</p>
      </div>

      <div id="math-mega-pack-output" className="space-y-0 rounded-2xl border bg-card">
        {/* Cover Page */}
        <div className="flex min-h-[600px] flex-col items-center justify-center border-b border-border p-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
            <Package className="h-4 w-4" /> Mega Pack
          </div>
          <h2 className="font-display text-4xl font-extrabold text-foreground leading-tight md:text-5xl">
            50 Math Worksheets
          </h2>
          <p className="mt-3 text-xl text-muted-foreground">for Grades 3–5</p>
          <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-3 text-sm">
            {mathWorksheetTopics.map((t) => (
              <span key={t} className={`rounded-lg border px-4 py-2 font-medium ${topicColors[t]}`}>
                {t}
              </span>
            ))}
          </div>
          <div className="mt-10 space-y-1 text-sm text-muted-foreground">
            <p>📐 Daily practice • Homework • Test prep • Small groups</p>
            <p>🖨️ Ready to print &nbsp;•&nbsp; Answer keys included</p>
          </div>
          <div className="mt-8 flex items-center gap-1.5 text-xs text-muted-foreground/70">
            <GraduationCap className="h-3 w-3" />
            <span className="font-semibold tracking-widest uppercase">TeachKit</span>
          </div>
        </div>

        {/* Worksheets by Topic */}
        {mathWorksheetTopics.map((topic) => {
          const worksheets = mathWorksheetData.filter((w) => w.topic === topic);
          return (
            <div key={topic} className="border-b border-border">
              {/* Topic Header */}
              <div className="bg-muted/30 px-8 py-5 border-b border-border">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex rounded-lg border px-4 py-1.5 text-sm font-bold uppercase tracking-wider ${topicColors[topic]}`}>
                    {topic}
                  </span>
                  <span className="text-sm text-muted-foreground">{worksheets.length} worksheets</span>
                </div>
              </div>

              {/* Individual Worksheets */}
              {worksheets.map((ws) => (
                <div key={ws.id} className="p-8 border-b border-border last:border-b-0">
                  {/* Worksheet Header */}
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {ws.id}
                      </span>
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${topicColors[ws.topic]}`}>
                        {ws.topic}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{ws.title}</h3>
                  <p className="mt-1 text-sm italic text-muted-foreground">{ws.instructions}</p>

                  {/* Name / Date Line */}
                  <div className="mt-4 mb-5 flex gap-8 text-sm text-muted-foreground">
                    <span>Name: ______________________________</span>
                    <span>Date: ______________</span>
                  </div>

                  {/* Questions */}
                  <div className="space-y-5">
                    {ws.questions.map((q) => (
                      <div key={q.number} className="rounded-xl border border-border p-5 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {q.number}
                          </span>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeBadgeColors[q.responseType]}`}>
                            {typeLabels[q.responseType]}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground leading-relaxed whitespace-pre-line">{q.question}</p>
                        {/* Response Lines */}
                        <div className="space-y-2 pt-1">
                          {Array.from({ length: q.linesForResponse }).map((_, i) => (
                            <div key={i} className="h-6 border-b border-muted-foreground/20" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        {/* Footer */}
        <div className="p-6 text-center">
          <p className="text-xs text-muted-foreground italic">
            ✅ Math Worksheet Mega Pack — 50 Worksheets for Grades 3–5 — Generated by TeachKit
          </p>
        </div>
      </div>
    </div>
  );
};

export default MathWorksheetMegaPack;
