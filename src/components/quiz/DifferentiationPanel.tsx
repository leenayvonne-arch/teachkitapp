import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Users, GraduationCap, BookOpen, Globe, ShieldCheck } from "lucide-react";
import type { Quiz } from "@/pages/dashboard/QuizGenerator";

export type DiffLevel = "simplified" | "standard" | "advanced" | "ell" | "iep";

interface DiffOption {
  key: DiffLevel;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const DIFF_OPTIONS: DiffOption[] = [
  {
    key: "simplified",
    label: "Simplified",
    description: "Lower reading level, basic vocabulary, scaffolded questions",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    key: "standard",
    label: "Standard",
    description: "Grade-level complexity, balanced rigor",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  {
    key: "advanced",
    label: "Advanced",
    description: "Higher-order thinking, deeper analysis, extended responses",
    icon: <Users className="h-4 w-4" />,
  },
  {
    key: "ell",
    label: "ELL Support",
    description: "Simplified language, vocabulary support, visual cues",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    key: "iep",
    label: "IEP Accommodations",
    description: "Adjusted wording, reduced complexity, built-in scaffolding",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
];

interface Props {
  onDifferentiate: (level: DiffLevel) => Promise<void>;
  generatedVersions: DiffLevel[];
  isGenerating: boolean;
  generatingLevel: DiffLevel | null;
}

const DifferentiationPanel = ({ onDifferentiate, generatedVersions, isGenerating, generatingLevel }: Props) => {
  return (
    <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-primary" />
        <h3 className="font-display text-base font-semibold text-foreground">Differentiate This Quiz</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Generate adapted versions for diverse learners. Each version maintains the same topic and learning objectives.
      </p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {DIFF_OPTIONS.map((opt) => {
          const alreadyGenerated = generatedVersions.includes(opt.key);
          const isCurrentlyGenerating = isGenerating && generatingLevel === opt.key;
          return (
            <Button
              key={opt.key}
              variant={alreadyGenerated ? "default" : "outline"}
              className="h-auto flex-col items-start gap-1 rounded-xl px-4 py-3 text-left"
              disabled={isGenerating}
              onClick={() => onDifferentiate(opt.key)}
            >
              <div className="flex w-full items-center gap-2">
                {isCurrentlyGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  opt.icon
                )}
                <span className="text-sm font-semibold">{opt.label}</span>
                {alreadyGenerated && (
                  <span className="ml-auto text-[10px] uppercase tracking-wide opacity-70">✓ Generated</span>
                )}
              </div>
              <span className="text-xs font-normal opacity-70 leading-snug">{opt.description}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default DifferentiationPanel;
export { DIFF_OPTIONS };
