import type { PreviewPage } from "@/data/shopProducts";
import { Badge } from "@/components/ui/badge";

interface WorksheetPreviewCardProps {
  page: PreviewPage;
  compact?: boolean;
  onClick?: () => void;
}

const WorksheetPreviewCard = ({ page, compact = false, onClick }: WorksheetPreviewCardProps) => {
  const lines = Array.from({ length: page.responseLines }, (_, i) => i);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group block w-full cursor-pointer rounded-md border border-border bg-white text-left shadow-sm transition-all hover:shadow-md hover:border-primary/30 dark:bg-card ${
        compact ? "" : ""
      }`}
    >
      {/* Paper top edge */}
      <div className="h-1.5 rounded-t-md bg-primary/70" />

      <div className={compact ? "px-4 py-3" : "px-6 py-5"}>
        {/* Header area */}
        <div className="mb-3 flex items-center justify-between">
          <Badge variant="outline" className="text-[10px] font-normal">
            {page.subject}
          </Badge>
          <span className="text-[10px] text-muted-foreground">Name: _______________</span>
        </div>

        {/* Title */}
        <h4 className={`font-bold text-foreground ${compact ? "text-xs" : "text-sm"}`}>
          {page.title}
        </h4>

        {/* Directions */}
        <p className={`mt-1.5 italic text-muted-foreground ${compact ? "text-[10px]" : "text-xs"}`}>
          <span className="font-semibold not-italic text-foreground">Directions:</span>{" "}
          {page.directions}
        </p>

        {/* Divider */}
        <div className="my-3 border-t border-dashed border-border" />

        {/* Question */}
        <div className={`whitespace-pre-line text-foreground ${compact ? "text-[10px] leading-relaxed" : "text-xs leading-relaxed"}`}>
          {page.question}
        </div>

        {/* Response lines */}
        <div className={compact ? "mt-3 space-y-2.5" : "mt-4 space-y-3"}>
          {lines.map((i) => (
            <div
              key={i}
              className="border-b border-muted-foreground/25"
              style={{ minHeight: compact ? 12 : 16 }}
            />
          ))}
        </div>

        {/* Footer */}
        {!compact && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[9px] text-muted-foreground/50">© TeachKit Resource Shop</span>
            <span className="text-[10px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Click to enlarge
            </span>
          </div>
        )}
      </div>
    </button>
  );
};

export default WorksheetPreviewCard;
