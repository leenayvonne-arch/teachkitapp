import { useState } from "react";
import { useGenerationLimit } from "@/hooks/useGenerationLimit";
import GenerationLimitDialog from "@/components/GenerationLimitDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Download, Save, LogOut, Sparkles, Brain, Lightbulb, Target, Printer } from "lucide-react";
import { saveResource, downloadElementAsPDF } from "@/lib/resourceUtils";
import RegenerateOptions, { type RegenerateAction } from "@/components/lesson/RegenerateOptions";
import TopicSuggestions from "@/components/TopicSuggestions";

interface ExitTicketQuestion {
  number: number;
  type: "comprehension" | "reflection" | "skill_application";
  typeLabel: string;
  question: string;
  linesForResponse: number;
}

interface ExitTicket {
  title: string;
  questions: ExitTicketQuestion[];
}

const GRADES = ["K", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];

const typeIcon: Record<string, React.ReactNode> = {
  comprehension: <Brain className="h-4 w-4" />,
  reflection: <Lightbulb className="h-4 w-4" />,
  skill_application: <Target className="h-4 w-4" />,
};

const typeBg: Record<string, string> = {
  comprehension: "bg-primary/10 text-primary",
  reflection: "bg-secondary/10 text-secondary",
  skill_application: "bg-accent/20 text-accent-foreground",
};

const ExitTicketGenerator = () => {
  const [gradeLevel, setGradeLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [exitTicket, setExitTicket] = useState<ExitTicket | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regenAction, setRegenAction] = useState<RegenerateAction | null>(null);

  const handleGenerate = async (regenerateAction?: RegenerateAction) => {
    if (!gradeLevel || !subject || !topic) {
      toast({ title: "Missing fields", description: "Please fill in Grade Level, Subject, and Topic.", variant: "destructive" });
      return;
    }

    const isRegen = !!regenerateAction;
    if (isRegen) { setIsRegenerating(true); setRegenAction(regenerateAction!); }
    else { setIsGenerating(true); }

    try {
      const { data, error } = await supabase.functions.invoke("generate-exit-ticket", {
        body: { gradeLevel, subject, topic, regenerateAction },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setExitTicket(data.exitTicket);
      toast({ title: isRegen ? "Exit ticket regenerated!" : "Exit ticket generated!" });
    } catch (e: any) {
      console.error(e);
      toast({ title: "Generation failed", description: e.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
      setIsRegenerating(false);
      setRegenAction(null);
    }
  };

  const handleSave = async () => {
    if (!exitTicket) return;
    await saveResource({
      title: exitTicket.title,
      resourceType: "exit_ticket",
      gradeLevel,
      subject,
      topic,
      content: exitTicket as unknown as Record<string, unknown>,
    });
  };

  const handleDownloadPDF = () => downloadElementAsPDF("exit-ticket-output", exitTicket?.title || "exit-ticket");

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 font-display text-2xl font-bold text-foreground">Exit Ticket Generator</h1>
      <p className="mb-8 text-muted-foreground">Create quick end-of-lesson checks for understanding.</p>

      <Card className="mb-8 rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <LogOut className="h-5 w-5 text-primary" />
            Exit Ticket Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label>Grade Level *</Label>
              <Select value={gradeLevel} onValueChange={setGradeLevel}>
                <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Select grade" /></SelectTrigger>
                <SelectContent>
                  {GRADES.map((g) => <SelectItem key={g} value={g}>{g} Grade</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Subject *</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>
                  {["Math", "ELA", "Science", "Social Studies", "History"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Topic *</Label>
              <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Fractions" className="mt-1 rounded-xl" />
              <TopicSuggestions subject={subject} onSelect={setTopic} />
            </div>
          </div>

          <Button onClick={() => handleGenerate()} disabled={isGenerating} className="w-full rounded-xl" size="lg">
            {isGenerating ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Exit Ticket…</>
            ) : (
              <><Sparkles className="mr-2 h-4 w-4" /> Generate Exit Ticket</>
            )}
          </Button>
        </CardContent>
      </Card>

      {exitTicket && (
        <>
          <div className="mb-4 flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-xl" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Save Exit Ticket
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
          </div>

          <div className="mb-4">
            <RegenerateOptions
              onAction={(action) => handleGenerate(action)}
              isLoading={isRegenerating}
              loadingAction={regenAction}
            />
          </div>

          <div id="exit-ticket-output" className="rounded-2xl border bg-white dark:bg-card shadow-sm" style={{ maxWidth: 816, margin: "0 auto", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            <div className="px-12 py-10">
              {/* Header */}
              <div className="rounded-lg bg-muted/30 px-5 py-4 border-b-2 border-foreground/20 text-center">
                <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-primary">
                  <LogOut className="h-3.5 w-3.5" /> Exit Ticket
                </div>
                <h2 className="font-display text-xl font-bold text-foreground">{exitTicket.title}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Grade: {gradeLevel} &nbsp;•&nbsp; Subject: {subject} &nbsp;•&nbsp; Topic: {topic}
                </p>
                <div className="mx-auto mt-4 flex max-w-md justify-between text-sm text-muted-foreground">
                  <span>Name: ______________________</span>
                  <span>Date: _______________</span>
                </div>
              </div>

              {/* Questions */}
              <div className="mt-8 space-y-4">
                {exitTicket.questions.map((q) => (
                  <div key={q.number} className="rounded-md border border-border/40 px-5 py-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-foreground text-sm">{q.number})</span>
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-sans text-xs font-medium ${typeBg[q.type] || "bg-muted text-muted-foreground"}`}>
                        {typeIcon[q.type]}
                        {q.typeLabel}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground leading-relaxed">{q.question}</p>
                    <div className="ml-5 space-y-3 pt-1">
                      {Array.from({ length: q.linesForResponse || 3 }).map((_, i) => (
                        <div key={i} className="border-b border-muted-foreground/25 h-5" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-10 flex items-center justify-between border-t border-foreground/10 pt-3">
                <span className="text-[10px] text-muted-foreground/50">© TeachKit</span>
                <span className="text-xs text-muted-foreground italic">✅ Hand this in before you leave.</span>
                <span className="text-[10px] text-muted-foreground/50">Page 1</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExitTicketGenerator;
