import { useState, useMemo } from "react";
import { Package, GraduationCap, FileText, ClipboardCheck, HelpCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { mathWorksheetData, mathWorksheetTopics } from "@/data/mathWorksheetMegaPack";
import { mathExitTicketData, mathExitTicketTopics } from "@/data/mathExitTicketPack";
import { mathQuizData, mathQuizTopics } from "@/data/mathQuizPack";

const topicColors: Record<string, string> = {
  Fractions: "bg-primary/10 text-primary border-primary/20",
  Geometry: "bg-secondary/10 text-secondary border-secondary/20",
  Measurement: "bg-accent/20 text-accent-foreground border-accent/20",
  "Word Problems": "bg-muted text-muted-foreground border-border",
  "Place Value": "bg-primary/10 text-primary border-primary/20",
  Multiplication: "bg-secondary/10 text-secondary border-secondary/20",
  Operations: "bg-accent/20 text-accent-foreground border-accent/20",
  "Addition & Subtraction": "bg-primary/10 text-primary border-primary/20",
};

const typeBadgeColors: Record<string, string> = {
  short_answer: "bg-primary/10 text-primary",
  multiple_choice: "bg-secondary/10 text-secondary",
  fill_in_blank: "bg-accent/20 text-accent-foreground",
  open_ended: "bg-muted text-muted-foreground",
  comprehension: "bg-primary/10 text-primary",
  short_response: "bg-secondary/10 text-secondary",
  critical_thinking: "bg-accent/20 text-accent-foreground",
};

const typeLabels: Record<string, string> = {
  short_answer: "Short Answer",
  multiple_choice: "Multiple Choice",
  fill_in_blank: "Fill in the Blank",
  open_ended: "Open Ended",
  comprehension: "Comprehension",
  short_response: "Short Response",
  critical_thinking: "Critical Thinking",
};

const MathClassroomBundle = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [topicFilter, setTopicFilter] = useState<string | null>(null);

  const worksheetCount = mathWorksheetData.length;
  const exitTicketCount = mathExitTicketData.length;
  const quizQuestionCount = mathQuizData.reduce((sum, q) => sum + q.questions.length, 0);
  const totalResources = worksheetCount + exitTicketCount + mathQuizData.length;

  const allTopics = useMemo(() => {
    const topics = new Set<string>();
    if (activeTab === "all" || activeTab === "worksheets") {
      mathWorksheetTopics.forEach((t) => topics.add(t));
    }
    if (activeTab === "all" || activeTab === "exit-tickets") {
      mathExitTicketTopics.forEach((t) => topics.add(t));
    }
    if (activeTab === "all" || activeTab === "quizzes") {
      mathQuizTopics.forEach((t) => topics.add(t));
    }
    return Array.from(topics);
  }, [activeTab]);

  const filteredWorksheets = useMemo(() => {
    if (activeTab !== "all" && activeTab !== "worksheets") return [];
    if (!topicFilter) return mathWorksheetData;
    return mathWorksheetData.filter((w) => w.topic === topicFilter);
  }, [activeTab, topicFilter]);

  const filteredExitTickets = useMemo(() => {
    if (activeTab !== "all" && activeTab !== "exit-tickets") return [];
    if (!topicFilter) return mathExitTicketData;
    return mathExitTicketData.filter((t) => t.topic === topicFilter);
  }, [activeTab, topicFilter]);

  const filteredQuizzes = useMemo(() => {
    if (activeTab !== "all" && activeTab !== "quizzes") return [];
    if (!topicFilter) return mathQuizData;
    return mathQuizData.filter((q) => q.topic === topicFilter);
  }, [activeTab, topicFilter]);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Math Classroom Resource Bundle</h1>
        <p className="text-muted-foreground">100 resources for Grades 3–5 — Worksheets, Exit Tickets & Quizzes</p>
      </div>

      <div id="math-bundle-output" className="space-y-0 rounded-2xl border bg-card">
        {/* Cover Page */}
        <div className="flex min-h-[500px] flex-col items-center justify-center border-b border-border p-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
            <Package className="h-4 w-4" /> Complete Bundle
          </div>
          <h2 className="font-display text-4xl font-extrabold text-foreground leading-tight md:text-5xl">
            Math Classroom Bundle
          </h2>
          <p className="mt-3 text-xl text-muted-foreground">100 Resources for Grades 3–5</p>

          <div className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <FileText className="h-6 w-6 text-primary" />
              <span className="font-bold text-foreground">{worksheetCount}</span>
              <span className="text-xs text-muted-foreground">Worksheets</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl border border-secondary/20 bg-secondary/5 p-4">
              <ClipboardCheck className="h-6 w-6 text-secondary" />
              <span className="font-bold text-foreground">{exitTicketCount}</span>
              <span className="text-xs text-muted-foreground">Exit Tickets</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl border border-accent/20 bg-accent/5 p-4">
              <HelpCircle className="h-6 w-6 text-accent" />
              <span className="font-bold text-foreground">{mathQuizData.length}</span>
              <span className="text-xs text-muted-foreground">Quizzes</span>
            </div>
          </div>

          <div className="mt-8 space-y-1 text-sm text-muted-foreground">
            <p>📐 Fractions • Geometry • Measurement • Word Problems • Operations</p>
            <p>🖨️ Ready to print &nbsp;•&nbsp; Answer keys included</p>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground/70">
            <GraduationCap className="h-3 w-3" />
            <span className="font-semibold tracking-widest uppercase">TeachKit</span>
          </div>
        </div>

        {/* Tabs & Filters */}
        <div className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur-sm px-6 py-4 space-y-3">
          <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setTopicFilter(null); }}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="all">All ({totalResources})</TabsTrigger>
              <TabsTrigger value="worksheets">
                <FileText className="mr-1.5 h-3.5 w-3.5" /> Worksheets ({worksheetCount})
              </TabsTrigger>
              <TabsTrigger value="exit-tickets">
                <ClipboardCheck className="mr-1.5 h-3.5 w-3.5" /> Exit Tickets ({exitTicketCount})
              </TabsTrigger>
              <TabsTrigger value="quizzes">
                <HelpCircle className="mr-1.5 h-3.5 w-3.5" /> Quizzes ({mathQuizData.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTopicFilter(null)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                !topicFilter ? "bg-primary text-primary-foreground border-primary" : "bg-muted/50 text-muted-foreground border-border hover:bg-muted"
              }`}
            >
              All Topics
            </button>
            {allTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => setTopicFilter(topicFilter === topic ? null : topic)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  topicFilter === topic
                    ? "bg-primary text-primary-foreground border-primary"
                    : `${topicColors[topic] || "bg-muted text-muted-foreground border-border"} hover:opacity-80`
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Worksheets Section */}
        {filteredWorksheets.length > 0 && (
          <div className="border-b border-border">
            <div className="bg-primary/5 px-8 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Worksheets</h3>
                <Badge variant="secondary">{filteredWorksheets.length} worksheets</Badge>
              </div>
            </div>

            {filteredWorksheets.map((ws) => (
              <div key={ws.id} className="p-8 border-b border-border last:border-b-0">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {ws.id}
                  </span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${topicColors[ws.topic] || "bg-muted text-muted-foreground border-border"}`}>
                    {ws.topic}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground">{ws.title}</h3>
                <p className="mt-1 text-sm italic text-muted-foreground">{ws.instructions}</p>

                <div className="mt-4 mb-5 flex gap-8 text-sm text-muted-foreground">
                  <span>Name: ______________________________</span>
                  <span>Date: ______________</span>
                </div>

                <div className="space-y-5">
                  {ws.questions.map((q) => (
                    <div key={q.number} className="rounded-xl border border-border p-5 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {q.number}
                        </span>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeBadgeColors[q.responseType] || ""}`}>
                          {typeLabels[q.responseType] || q.responseType}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground leading-relaxed whitespace-pre-line">{q.question}</p>
                      <div className="space-y-2 pt-1">
                        {Array.from({ length: q.linesForResponse }).map((_, i) => (
                          <div key={i} className="h-6 border-b border-muted-foreground/20" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Exit Tickets Section */}
        {filteredExitTickets.length > 0 && (
          <div className="border-b border-border">
            <div className="bg-secondary/5 px-8 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <ClipboardCheck className="h-5 w-5 text-secondary" />
                <h3 className="text-lg font-bold text-foreground">Exit Tickets</h3>
                <Badge variant="secondary">{filteredExitTickets.length} tickets</Badge>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-5">
                {filteredExitTickets.map((ticket) => (
                  <div key={ticket.id} className="rounded-xl border border-border p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-secondary/10 text-sm font-bold text-secondary">
                        {ticket.id}
                      </span>
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${topicColors[ticket.topic] || "bg-muted text-muted-foreground border-border"}`}>
                        {ticket.topic}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeBadgeColors[ticket.type] || ""}`}>
                        {ticket.typeLabel}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground leading-relaxed">{ticket.question}</p>
                    <div className="space-y-2 pt-1">
                      {Array.from({ length: ticket.lines }).map((_, i) => (
                        <div key={i} className="h-6 border-b border-muted-foreground/20" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quizzes Section */}
        {filteredQuizzes.length > 0 && (
          <div className="border-b border-border">
            <div className="bg-accent/5 px-8 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-bold text-foreground">Quizzes</h3>
                <Badge variant="secondary">{filteredQuizzes.length} quizzes • {filteredQuizzes.reduce((s, q) => s + q.questions.length, 0)} questions</Badge>
              </div>
            </div>

            {filteredQuizzes.map((quiz) => (
              <div key={quiz.id} className="p-8 border-b border-border last:border-b-0">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                    {quiz.id}
                  </span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${topicColors[quiz.topic] || "bg-muted text-muted-foreground border-border"}`}>
                    {quiz.topic}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground">{quiz.title}</h3>
                <p className="mt-1 text-sm italic text-muted-foreground">{quiz.instructions}</p>

                <div className="mt-4 mb-5 flex gap-8 text-sm text-muted-foreground">
                  <span>Name: ______________________________</span>
                  <span>Score: ____ / {quiz.questions.length}</span>
                </div>

                <div className="space-y-5">
                  {quiz.questions.map((q) => (
                    <div key={q.number} className="rounded-xl border border-border p-5 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                          {q.number}
                        </span>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeBadgeColors[q.responseType] || ""}`}>
                          {typeLabels[q.responseType] || q.responseType}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground leading-relaxed whitespace-pre-line">{q.question}</p>
                      <div className="space-y-2 pt-1">
                        {Array.from({ length: q.linesForResponse }).map((_, i) => (
                          <div key={i} className="h-6 border-b border-muted-foreground/20" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {filteredWorksheets.length === 0 && filteredExitTickets.length === 0 && filteredQuizzes.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No resources match this filter. Try a different topic.</p>
          </div>
        )}

        {/* Footer */}
        <div className="p-6 text-center">
          <p className="text-xs text-muted-foreground italic">
            ✅ Math Classroom Resource Bundle — {totalResources} Resources for Grades 3–5 — Generated by TeachKit
          </p>
        </div>
      </div>
    </div>
  );
};

export default MathClassroomBundle;
