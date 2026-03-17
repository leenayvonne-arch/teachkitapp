import { BookOpen, Clock, Target, CheckCircle, Lightbulb, Users, List } from "lucide-react";
import type { LessonPlan } from "@/pages/dashboard/LessonPlanGenerator";

const Section = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
      {icon} {title}
    </h3>
    {children}
  </div>
);

const DiffCard = ({ label, items, color }: { label: string; items: string[]; color: string }) => (
  <div className="rounded-xl border p-4">
    <h4 className={`mb-2 text-sm font-semibold text-${color}`}>{label}</h4>
    <ul className="list-disc space-y-1 pl-4 text-xs text-foreground">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  </div>
);

const PHASE_LABELS: Record<string, string> = {
  hook: "🪝 Hook",
  instruction: "📖 Direct Instruction",
  guidedPractice: "🤝 Guided Practice",
  independentPractice: "✍️ Independent Practice",
  closure: "🔚 Closure",
};

const LessonPlanOutput = ({ lessonPlan }: { lessonPlan: LessonPlan }) => (
  <div id="lesson-plan-output" className="rounded-2xl border bg-card p-8 space-y-8">
    {/* Header */}
    <div className="border-b border-border pb-6 text-center">
      <h2 className="font-display text-2xl font-bold text-foreground">{lessonPlan.lessonTitle}</h2>
      <div className="mt-2 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
        <span>Grade: {lessonPlan.gradeLevel}</span>
        <span>•</span>
        <span>Subject: {lessonPlan.subject}</span>
        <span>•</span>
        <span>Topic: {lessonPlan.topic}</span>
        <span>•</span>
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{lessonPlan.duration}</span>
      </div>
    </div>

    <Section icon={<Target className="h-5 w-5 text-primary" />} title="Standards Alignment">
      <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
        {lessonPlan.standards.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </Section>

    <Section icon={<CheckCircle className="h-5 w-5 text-secondary" />} title="Learning Objectives">
      <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
        {lessonPlan.objectives.map((o, i) => <li key={i}>{o}</li>)}
      </ul>
    </Section>

    <Section icon={<BookOpen className="h-5 w-5 text-accent" />} title="Key Vocabulary">
      <div className="grid gap-2 sm:grid-cols-2">
        {lessonPlan.keyVocabulary.map((v, i) => (
          <div key={i} className="rounded-xl border bg-muted/50 p-3">
            <span className="font-semibold text-foreground">{v.term}</span>
            <span className="text-sm text-muted-foreground"> — {v.definition}</span>
          </div>
        ))}
      </div>
    </Section>

    <Section icon={<List className="h-5 w-5 text-primary" />} title="Materials / Resources">
      <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
        {lessonPlan.materials.map((m, i) => <li key={i}>{m}</li>)}
      </ul>
    </Section>

    <Section icon={<Lightbulb className="h-5 w-5 text-accent" />} title="Instructional Strategies">
      <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
        {lessonPlan.instructionalStrategies.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </Section>

    <Section icon={<BookOpen className="h-5 w-5 text-primary" />} title="Lesson Procedures">
      <div className="space-y-4">
        {(["hook", "instruction", "guidedPractice", "independentPractice", "closure"] as const).map((phase) => {
          const data = lessonPlan.procedures[phase];
          return (
            <div key={phase} className="rounded-xl border bg-muted/30 p-4">
              <div className="mb-1 flex items-center justify-between">
                <h4 className="font-semibold text-foreground">{PHASE_LABELS[phase]}</h4>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{data.duration}</span>
              </div>
              <p className="mb-2 text-sm text-muted-foreground">{data.description}</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
                {data.activities.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>

    <Section icon={<Users className="h-5 w-5 text-secondary" />} title="Differentiation Strategies">
      <div className="grid gap-4 sm:grid-cols-3">
        <DiffCard label="Below Level" items={lessonPlan.differentiation.belowLevel} color="destructive" />
        <DiffCard label="On Level" items={lessonPlan.differentiation.onLevel} color="primary" />
        <DiffCard label="Above Level" items={lessonPlan.differentiation.aboveLevel} color="secondary" />
      </div>
    </Section>

    <Section icon={<CheckCircle className="h-5 w-5 text-accent" />} title="Exit Ticket">
      <p className="mb-3 text-sm font-medium text-foreground">{lessonPlan.exitTicket.prompt}</p>
      <ol className="list-decimal space-y-1 pl-5 text-sm text-foreground">
        {lessonPlan.exitTicket.questions.map((q, i) => <li key={i}>{q}</li>)}
      </ol>
    </Section>
  </div>
);

export default LessonPlanOutput;
