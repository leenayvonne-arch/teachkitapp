import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Download, Printer } from "lucide-react";
import { saveResource, downloadElementAsPDF } from "@/lib/resourceUtils";
import QuizOutput from "@/components/quiz/QuizOutput";
import type { Quiz } from "@/pages/dashboard/QuizGenerator";
import type { DiffLevel } from "@/components/quiz/DifferentiationPanel";
import { DIFF_OPTIONS } from "@/components/quiz/DifferentiationPanel";

interface VersionEntry {
  level: DiffLevel;
  quiz: Quiz;
}

interface Props {
  versions: VersionEntry[];
  gradeLevel: string;
  subject: string;
  topic: string;
  activeTab: DiffLevel;
  onTabChange: (tab: DiffLevel) => void;
}

const QuizVersionTabs = ({ versions, gradeLevel, subject, topic, activeTab, onTabChange }: Props) => {
  const handleSave = async (version: VersionEntry) => {
    const label = DIFF_OPTIONS.find((o) => o.key === version.level)?.label || version.level;
    await saveResource({
      title: `${version.quiz.title} (${label})`,
      resourceType: "quiz",
      gradeLevel,
      subject,
      topic,
      content: version.quiz as unknown as Record<string, unknown>,
    });
  };

  const handleDownload = (version: VersionEntry) => {
    const label = DIFF_OPTIONS.find((o) => o.key === version.level)?.label || version.level;
    downloadElementAsPDF(
      `quiz-diff-${version.level}`,
      `${version.quiz.title} (${label})`
    );
  };

  if (versions.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-semibold text-foreground">Differentiated Versions</h3>
      <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as DiffLevel)}>
        <TabsList className="flex-wrap h-auto gap-1">
          {versions.map((v) => {
            const label = DIFF_OPTIONS.find((o) => o.key === v.level)?.label || v.level;
            return (
              <TabsTrigger key={v.level} value={v.level} className="rounded-lg text-xs">
                {label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {versions.map((v) => {
          const label = DIFF_OPTIONS.find((o) => o.key === v.level)?.label || v.level;
          return (
            <TabsContent key={v.level} value={v.level} className="space-y-4 mt-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="rounded-xl" onClick={() => handleSave(v)}>
                  <Save className="mr-2 h-4 w-4" /> Save {label} Version
                </Button>
                <Button variant="outline" className="rounded-xl" onClick={() => handleDownload(v)}>
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>
              <QuizOutput
                quiz={v.quiz}
                gradeLevel={gradeLevel}
                subject={subject}
                topic={topic}
                elementId={`quiz-diff-${v.level}`}
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default QuizVersionTabs;
