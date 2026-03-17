import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingDown, TrendingUp, Plus, Minus, Maximize } from "lucide-react";
import { Loader2 } from "lucide-react";

export type RegenerateAction =
  | "regenerate"
  | "simplify"
  | "challenge"
  | "add_questions"
  | "shorten"
  | "expand";

interface Props {
  onAction: (action: RegenerateAction) => void;
  isLoading: boolean;
  loadingAction: RegenerateAction | null;
  /** Show "Add More Questions" button (for quiz/worksheet only) */
  showAddQuestions?: boolean;
}

const actions: { key: RegenerateAction; label: string; icon: React.ReactNode; showAlways?: boolean }[] = [
  { key: "regenerate", label: "Regenerate", icon: <RefreshCw className="h-3.5 w-3.5" />, showAlways: true },
  { key: "simplify", label: "Simplify", icon: <TrendingDown className="h-3.5 w-3.5" />, showAlways: true },
  { key: "challenge", label: "More Challenging", icon: <TrendingUp className="h-3.5 w-3.5" />, showAlways: true },
  { key: "add_questions", label: "Add More Questions", icon: <Plus className="h-3.5 w-3.5" /> },
  { key: "shorten", label: "Shorten", icon: <Minus className="h-3.5 w-3.5" />, showAlways: true },
  { key: "expand", label: "Expand", icon: <Maximize className="h-3.5 w-3.5" />, showAlways: true },
];

const RegenerateOptions = ({ onAction, isLoading, loadingAction, showAddQuestions = false }: Props) => (
  <div className="rounded-xl border border-dashed border-border bg-muted/20 p-4">
    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Regenerate Options</p>
    <div className="flex flex-wrap gap-2">
      {actions
        .filter((a) => a.showAlways || (a.key === "add_questions" && showAddQuestions))
        .map((a) => (
          <Button
            key={a.key}
            variant="outline"
            size="sm"
            className="rounded-lg text-xs"
            disabled={isLoading}
            onClick={() => onAction(a.key)}
          >
            {isLoading && loadingAction === a.key ? (
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
            ) : (
              <span className="mr-1.5">{a.icon}</span>
            )}
            {a.label}
          </Button>
        ))}
    </div>
  </div>
);

export default RegenerateOptions;
