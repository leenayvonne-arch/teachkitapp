import { GraduationCap } from "lucide-react";
import type { PreviewPage } from "@/data/shopProducts";

interface WorksheetPreviewCardProps {
  page: PreviewPage;
  compact?: boolean;
  onClick?: () => void;
}

const WorksheetPreviewCard = ({ page, compact = false, onClick }: WorksheetPreviewCardProps) => {
  // Parse numbered questions from the question text
  const questionBlocks = page.question.split(/\n(?=\d+[\)\.])/).filter(Boolean);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group block w-full cursor-pointer rounded-lg border border-border/60 bg-card text-left shadow-sm transition-all hover:shadow-lg hover:border-primary/30"
    >
      <div className={compact ? "px-5 py-4" : "px-7 py-5"} style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
        {/* Premium Header */}
        <div className="rounded-lg border border-border/50 px-4 py-3" style={{ background: "linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--muted)/0.4) 100%)" }}>
          <div className="flex items-center justify-between pb-0">
            <span className={`flex items-center gap-0.5 font-sans font-semibold tracking-[0.15em] uppercase text-muted-foreground/50 ${compact ? "text-[6px]" : "text-[7px]"}`}><GraduationCap className={compact ? "h-2 w-2" : "h-2.5 w-2.5"} />TeachKit</span>
          </div>
          <div className="flex items-start justify-between gap-2 pt-1">
            <div className="space-y-1.5">
              <span className={`inline-block rounded-full px-2.5 py-0.5 font-sans font-bold tracking-wide uppercase ${compact ? "text-[8px]" : "text-[9px]"}`} style={{ background: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" }}>
                {page.subject}
              </span>
              <h4 className={`font-bold text-foreground leading-snug ${compact ? "text-[11px]" : "text-[13px]"}`}>
                {page.title}
              </h4>
            </div>
            <div className={`flex flex-col items-end gap-1 text-foreground/50 ${compact ? "text-[8px]" : "text-[9px]"}`}>
              <div>Name: ___________________</div>
              <div>Date: ______________</div>
            </div>
          </div>
        </div>

        {/* Directions */}
        <div className="mt-3 rounded-md border border-border/40 px-3 py-2" style={{ background: "hsl(var(--muted)/0.2)" }}>
          <p className={`text-foreground/70 ${compact ? "text-[8px]" : "text-[9px]"}`}>
            <span className="font-bold not-italic text-foreground">Directions:</span>{" "}
            <span className="italic">{page.directions}</span>
          </p>
        </div>

        {/* Questions */}
        <div className={compact ? "mt-3 space-y-2.5" : "mt-4 space-y-3"}>
          {questionBlocks.map((block, idx) => (
            <div key={idx} className="rounded-md border border-border/40 px-3 py-2.5" style={{ background: "hsl(var(--muted)/0.06)" }}>
              <p className={`text-foreground leading-relaxed ${compact ? "text-[8px]" : "text-[9px]"}`}>
                <span className="font-bold">{block.trim()}</span>
              </p>
              <div className={compact ? "mt-1.5 space-y-2" : "mt-2.5 space-y-3"}>
                {Array.from({ length: Math.min(page.responseLines, compact ? 2 : 3) }).map((_, i) => (
                  <div
                    key={i}
                    className="border-b border-foreground/15"
                    style={{ minHeight: compact ? 10 : 16 }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between border-t-2 border-border/20 ${compact ? "mt-3 pt-2" : "mt-5 pt-2.5"}`}>
          <span className="font-sans text-[7px] font-medium text-muted-foreground/50 tracking-wide">© TeachKit Resource Shop</span>
          {!compact && (
            <span className="font-sans text-[8px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Click to enlarge
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default WorksheetPreviewCard;
