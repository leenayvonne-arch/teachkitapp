import { Button } from "@/components/ui/button";
import { Loader2, Users, GraduationCap, BookOpen, Globe, ShieldCheck } from "lucide-react";

export type LessonDiffLevel = "simplified" | "standard" | "advanced" | "ell" | "iep";

interface DiffOption {
  key: LessonDiffLevel;
  label: string;
  description: string;
  icon: React.ReactNode;
}

export const LESSON_DIFF_OPTIONS: DiffOption[] = [
  {
    key: "simplified",
    label: "Simplified",
    description: "Shorter instructions, simpler vocabulary, more guided practice",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    key: "standard",
    label: "Standard",
    description: "Grade-level complexity, balanced pacing",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  {
    key: "advanced",
    label: "Advanced",
    description: "Deeper thinking tasks, higher-level questions, extended activities",
    icon: <Users className="h-4 w-4" />,
  },
  {
    key: "ell",
    label: "ELL Support",
    description: "Simplified language, vocabulary definitions, sentence frames",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    key: "iep",
    label: "IEP Accommodations",
    description: "Chunked instructions, scaffolding supports, flexible pacing",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
];

interface Props {
  onDifferentiate: (level: LessonDiffLevel) => Promise<void>;
  generatedVersions: LessonDiffLevel[];
  isGenerating: boolean;
  generatingLevel: LessonDiffLevel | null;
}

const LessonDifferentiationPanel = ({ onDifferentiate, generatedVersions, isGenerating, generatingLevel }: Props) => {
  return (
    <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-primary" />
        <h3 className="font-display text-base font-semibold text-foreground">Differentiate This Lesson</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Generate adapted versions for diverse learners. Each version maintains the same topic and learning objectives.
      </p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {LESSON_DIFF_OPTIONS.map((opt) => {
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

export default LessonDifferentiationPanel;
