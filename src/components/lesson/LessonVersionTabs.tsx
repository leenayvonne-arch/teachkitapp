import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Download, Printer } from "lucide-react";
import { saveResource, downloadElementAsPDF } from "@/lib/resourceUtils";
import LessonPlanOutput from "@/components/lesson/LessonPlanOutput";
import type { LessonPlan } from "@/pages/dashboard/LessonPlanGenerator";
import type { LessonDiffLevel } from "@/components/lesson/LessonDifferentiationPanel";
import { LESSON_DIFF_OPTIONS } from "@/components/lesson/LessonDifferentiationPanel";

interface VersionEntry {
  level: LessonDiffLevel;
  lessonPlan: LessonPlan;
}

interface Props {
  versions: VersionEntry[];
  activeTab: LessonDiffLevel;
  onTabChange: (tab: LessonDiffLevel) => void;
}

const LessonVersionTabs = ({ versions, activeTab, onTabChange }: Props) => {
  const handleSave = async (version: VersionEntry) => {
    const label = LESSON_DIFF_OPTIONS.find((o) => o.key === version.level)?.label || version.level;
    await saveResource({
      title: `${version.lessonPlan.lessonTitle} (${label})`,
      resourceType: "lesson",
      gradeLevel: version.lessonPlan.gradeLevel,
      subject: version.lessonPlan.subject,
      topic: version.lessonPlan.topic,
      content: version.lessonPlan as unknown as Record<string, unknown>,
    });
  };

  const handleDownload = (version: VersionEntry) => {
    const label = LESSON_DIFF_OPTIONS.find((o) => o.key === version.level)?.label || version.level;
    downloadElementAsPDF(
      `lesson-diff-${version.level}`,
      `${version.lessonPlan.lessonTitle} (${label})`
    );
  };

  if (versions.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-semibold text-foreground">Differentiated Versions</h3>
      <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as LessonDiffLevel)}>
        <TabsList className="flex-wrap h-auto gap-1">
          {versions.map((v) => {
            const label = LESSON_DIFF_OPTIONS.find((o) => o.key === v.level)?.label || v.level;
            return (
              <TabsTrigger key={v.level} value={v.level} className="rounded-lg text-xs">
                {label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {versions.map((v) => {
          const label = LESSON_DIFF_OPTIONS.find((o) => o.key === v.level)?.label || v.level;
          return (
            <TabsContent key={v.level} value={v.level} className="space-y-4 mt-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="rounded-xl" onClick={() => handleSave(v)}>
                  <Save className="mr-2 h-4 w-4" /> Save {label} Version
                </Button>
                <Button variant="outline" className="rounded-xl" onClick={() => handleDownload(v)}>
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
                <Button variant="outline" className="rounded-xl" onClick={() => window.print()}>
                  <Printer className="mr-2 h-4 w-4" /> Print
                </Button>
              </div>
              <div id={`lesson-diff-${v.level}`}>
                <LessonPlanOutput lessonPlan={v.lessonPlan} />
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default LessonVersionTabs;
