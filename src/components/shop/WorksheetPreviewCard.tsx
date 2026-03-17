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
      className={`group block w-full cursor-pointer rounded-sm border border-border bg-white text-left shadow-sm transition-all hover:shadow-md hover:border-primary/30 dark:bg-card ${
        compact ? "" : ""
      }`}
    >
      {/* Page */}
      <div className={compact ? "px-5 py-4" : "px-8 py-6"} style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className={`inline-block rounded bg-primary/10 px-2 py-0.5 font-sans font-semibold text-primary ${compact ? "text-[9px]" : "text-[10px]"}`}>
              {page.subject}
            </span>
            <h4 className={`mt-1.5 font-bold text-foreground ${compact ? "text-xs" : "text-sm"}`}>
              {page.title}
            </h4>
          </div>
          <div className={`text-right text-muted-foreground ${compact ? "text-[9px]" : "text-[10px]"}`}>
            <div>Name: _____________________</div>
            <div className="mt-0.5">Date: _______________</div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-foreground/20" />

        {/* Directions */}
        <p className={`italic text-muted-foreground ${compact ? "text-[9px]" : "text-[10px]"}`}>
          <span className="font-bold not-italic text-foreground">Directions:</span>{" "}
          {page.directions}
        </p>

        {/* Divider */}
        <div className="my-3 border-t border-dashed border-border" />

        {/* Questions with answer lines */}
        <div className={compact ? "space-y-3" : "space-y-4"}>
          {questionBlocks.map((block, idx) => (
            <div key={idx}>
              <p className={`whitespace-pre-line text-foreground ${compact ? "text-[9px] leading-relaxed" : "text-[10px] leading-relaxed"}`}>
                <span className="font-bold">{block.trim()}</span>
              </p>
              {/* Answer lines under each question block */}
              <div className={compact ? "mt-1.5 space-y-2" : "mt-2 space-y-2.5"}>
                {Array.from({ length: Math.min(page.responseLines, compact ? 2 : 3) }).map((_, i) => (
                  <div
                    key={i}
                    className="border-b border-muted-foreground/30"
                    style={{ minHeight: compact ? 10 : 14 }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between ${compact ? "mt-4" : "mt-6"}`}>
          <span className="text-[8px] text-muted-foreground/40">© TeachKit Resource Shop</span>
          {!compact && (
            <span className="font-sans text-[9px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Click to enlarge
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default WorksheetPreviewCard;
