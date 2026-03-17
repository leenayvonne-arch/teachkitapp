import { Sparkles, BookOpen, Brain, Lightbulb } from "lucide-react";

const ExitTicketPackCover = () => (
  <div className="flex min-h-[600px] flex-col items-center justify-center p-12 text-center border-b border-border">
    {/* Decorative icons */}
    <div className="mb-8 flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
        <Brain className="h-6 w-6 text-primary" />
      </div>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10">
        <Sparkles className="h-7 w-7 text-secondary" />
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20">
        <Lightbulb className="h-6 w-6 text-accent-foreground" />
      </div>
    </div>

    <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
      100 Exit Tickets
    </h1>
    <h2 className="mt-2 font-display text-xl font-medium text-primary sm:text-2xl">
      for Any Classroom
    </h2>

    <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-primary/30" />

    <p className="mt-6 max-w-md text-base text-muted-foreground leading-relaxed">
      Quick, printable end-of-lesson checks covering <strong>Math</strong>, <strong>ELA</strong>, <strong>Science</strong>, and <strong>Social Studies</strong> for grades 4–8.
    </p>

    <div className="mt-8 flex flex-wrap justify-center gap-3">
      {["Comprehension Checks", "Reflection Prompts", "Critical Thinking"].map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1.5 rounded-full bg-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          {tag}
        </span>
      ))}
    </div>

    <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
      <BookOpen className="h-4 w-4" />
      <span>Grades 4–8 • 4 Subjects • Ready to Print</span>
    </div>
  </div>
);

export default ExitTicketPackCover;
