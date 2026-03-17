import { Brain, Lightbulb, Target } from "lucide-react";
import type { ExitTicketQuestion } from "./questions";

const typeIcon: Record<string, React.ReactNode> = {
  comprehension: <Brain className="h-3.5 w-3.5" />,
  reflection: <Lightbulb className="h-3.5 w-3.5" />,
  critical_thinking: <Target className="h-3.5 w-3.5" />,
};

const typeLabel: Record<string, string> = {
  comprehension: "Comprehension",
  reflection: "Reflection",
  critical_thinking: "Critical Thinking",
};

const colorMap: Record<string, { badge: string; num: string; border: string }> = {
  primary: {
    badge: "bg-primary/10 text-primary",
    num: "bg-primary/10 text-primary",
    border: "border-primary/20",
  },
  secondary: {
    badge: "bg-secondary/10 text-secondary",
    num: "bg-secondary/10 text-secondary",
    border: "border-secondary/20",
  },
  accent: {
    badge: "bg-accent/20 text-accent-foreground",
    num: "bg-accent/20 text-accent-foreground",
    border: "border-accent/20",
  },
  muted: {
    badge: "bg-muted text-muted-foreground",
    num: "bg-muted text-muted-foreground",
    border: "border-border",
  },
};

interface Props {
  title: string;
  subtitle: string;
  color: keyof typeof colorMap;
  questions: ExitTicketQuestion[];
}

const ExitTicketPackSection = ({ title, subtitle, color, questions }: Props) => {
  const c = colorMap[color];

  return (
    <div className="border-b border-border">
      {/* Section header */}
      <div className="border-b border-border bg-muted/30 px-8 py-6">
        <h2 className="font-display text-2xl font-bold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {/* Questions grid */}
      <div className="grid gap-4 p-8 sm:grid-cols-2">
        {questions.map((q, idx) => (
          <div
            key={idx}
            className={`rounded-xl border ${c.border} p-4 space-y-3`}
          >
            <div className="flex items-center gap-2">
              <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${c.num}`}>
                {idx + 1}
              </span>
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${c.badge}`}>
                {typeIcon[q.type]}
                {typeLabel[q.type]}
              </span>
            </div>
            <p className="text-sm font-medium text-foreground leading-relaxed">{q.question}</p>
            <div className="space-y-1.5 pt-1">
              {Array.from({ length: q.lines }).map((_, i) => (
                <div key={i} className="border-b border-muted-foreground/20 h-5" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExitTicketPackSection;
