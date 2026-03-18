import { motion } from "framer-motion";
import { FileText, BookOpen, HelpCircle, ClipboardCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WorksheetPreview = () => (
  <div className="rounded-xl border border-border bg-card p-5 font-serif text-[11px] leading-relaxed text-card-foreground shadow-md shadow-foreground/[0.03]">
    <div className="mb-3 rounded-lg bg-gradient-to-r from-primary/80 to-primary px-3 py-2 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground">TeachKit Worksheet</p>
      <p className="text-xs font-bold text-primary-foreground">Fractions &amp; Decimals</p>
    </div>
    <div className="mb-3 flex justify-between border-b border-dashed border-border pb-2 text-[10px] text-muted-foreground">
      <span>Name: _______________</span>
      <span>Date: ________</span>
    </div>
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-muted/30 p-2.5">
        <p className="mb-1.5 font-bold text-card-foreground">
          <span className="mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-[9px] font-bold text-primary">1</span>
          Convert 3/4 to a decimal.
        </p>
        <div className="mt-2 space-y-1.5">
          <div className="h-px w-full border-b border-dotted border-border" />
          <div className="h-px w-full border-b border-dotted border-border" />
        </div>
      </div>
      <div className="rounded-lg border border-border bg-muted/30 p-2.5">
        <p className="mb-1.5 font-bold text-card-foreground">
          <span className="mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-[9px] font-bold text-primary">2</span>
          Which is greater: 0.6 or 5/8?
        </p>
        <div className="mt-2 space-y-1.5">
          <div className="h-px w-full border-b border-dotted border-border" />
          <div className="h-px w-full border-b border-dotted border-border" />
        </div>
      </div>
    </div>
    <div className="mt-3 border-t border-border pt-2 text-center text-[9px] text-muted-foreground">
      Page 1 of 2
    </div>
  </div>
);

const LessonPlanPreview = () => (
  <div className="rounded-xl border border-border bg-card p-5 font-serif text-[11px] leading-relaxed text-card-foreground shadow-md shadow-foreground/[0.03]">
    <div className="mb-3 rounded-lg bg-gradient-to-r from-primary/80 to-primary px-3 py-2 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground">TeachKit Lesson Plan</p>
      <p className="text-xs font-bold text-primary-foreground">Introduction to Photosynthesis</p>
    </div>
    <div className="mb-3 flex gap-3 text-[10px] text-muted-foreground">
      <span className="rounded-md bg-muted px-1.5 py-0.5">Grade 5</span>
      <span className="rounded-md bg-muted px-1.5 py-0.5">Science</span>
      <span className="rounded-md bg-muted px-1.5 py-0.5">45 min</span>
    </div>
    <div className="space-y-2.5">
      <div>
        <p className="mb-1 font-bold text-primary">Objective</p>
        <p className="text-muted-foreground">Students will explain how plants convert sunlight into energy through photosynthesis.</p>
      </div>
      <div>
        <p className="mb-1 font-bold text-primary">Hook (5 min)</p>
        <p className="text-muted-foreground">Show a wilting plant vs. a healthy plant. Ask: "What does this plant need to survive?"</p>
      </div>
      <div>
        <p className="mb-1 font-bold text-primary">Direct Instruction (15 min)</p>
        <p className="text-muted-foreground">Introduce the photosynthesis equation using a labeled diagram...</p>
      </div>
      <div>
        <p className="mb-1 font-bold text-primary">Vocabulary</p>
        <p className="text-muted-foreground">Chlorophyll, glucose, carbon dioxide, oxygen</p>
      </div>
    </div>
  </div>
);

const QuizPreview = () => (
  <div className="rounded-xl border border-border bg-card p-5 font-serif text-[11px] leading-relaxed text-card-foreground shadow-md shadow-foreground/[0.03]">
    <div className="mb-3 rounded-lg bg-gradient-to-r from-primary/80 to-primary px-3 py-2 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground">TeachKit Quiz</p>
      <p className="text-xs font-bold text-primary-foreground">American Revolution</p>
    </div>
    <div className="mb-3 flex justify-between border-b border-dashed border-border pb-2 text-[10px] text-muted-foreground">
      <span>Name: _______________</span>
      <span>Score: ____ / 10</span>
    </div>
    <div className="space-y-3">
      <div>
        <p className="mb-1 font-bold text-card-foreground">1. Multiple Choice</p>
        <p className="mb-1.5 text-muted-foreground">What year did the Declaration of Independence get signed?</p>
        <div className="grid grid-cols-2 gap-1 text-muted-foreground">
          <p>○ A) 1774</p>
          <p>○ B) 1776</p>
          <p>○ C) 1781</p>
          <p>○ D) 1783</p>
        </div>
      </div>
      <div>
        <p className="mb-1 font-bold text-card-foreground">2. True or False</p>
        <p className="mb-1 text-muted-foreground">The Boston Tea Party occurred in 1773.</p>
        <p className="text-muted-foreground">○ True &nbsp;&nbsp; ○ False</p>
      </div>
      <div>
        <p className="mb-1 font-bold text-card-foreground">3. Short Answer</p>
        <p className="mb-1.5 text-muted-foreground">Name two causes of the American Revolution.</p>
        <div className="h-px w-full border-b border-dotted border-border" />
      </div>
    </div>
  </div>
);

const ExitTicketPreview = () => (
  <div className="rounded-xl border border-border bg-card p-5 font-serif text-[11px] leading-relaxed text-card-foreground shadow-md shadow-foreground/[0.03]">
    <div className="mb-3 rounded-lg bg-gradient-to-r from-primary/80 to-primary px-3 py-2 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground">TeachKit Exit Ticket</p>
      <p className="text-xs font-bold text-primary-foreground">Equivalent Fractions</p>
    </div>
    <div className="mb-3 flex justify-between border-b border-dashed border-border pb-2 text-[10px] text-muted-foreground">
      <span>Name: _______________</span>
      <span>Date: ________</span>
    </div>
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-muted/30 p-2.5">
        <p className="mb-1.5 font-bold text-card-foreground">
          <span className="mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-[9px] font-bold text-primary">1</span>
          Are 2/4 and 3/6 equivalent? Explain.
        </p>
        <div className="mt-2 space-y-1.5">
          <div className="h-px w-full border-b border-dotted border-border" />
          <div className="h-px w-full border-b border-dotted border-border" />
        </div>
      </div>
      <div className="rounded-lg border border-border bg-muted/30 p-2.5">
        <p className="mb-1.5 font-bold text-card-foreground">
          <span className="mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-[9px] font-bold text-primary">2</span>
          Write a fraction equivalent to 1/3.
        </p>
        <div className="mt-2 space-y-1.5">
          <div className="h-px w-full border-b border-dotted border-border" />
        </div>
      </div>
      <div className="rounded-lg border border-border bg-muted/30 p-2.5">
        <p className="mb-1.5 font-bold text-card-foreground">
          <span className="mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-[9px] font-bold text-primary">3</span>
          Rate your understanding: 😊 😐 😕
        </p>
      </div>
    </div>
  </div>
);

const previews = [
  { label: "Lesson Plan", component: LessonPlanPreview, icon: BookOpen },
  { label: "Worksheet", component: WorksheetPreview, icon: FileText },
  { label: "Quiz", component: QuizPreview, icon: HelpCircle },
  { label: "Exit Ticket", component: ExitTicketPreview, icon: ClipboardCheck },
];

const SeeWhatYouGetSection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-60 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
            See What You Get
          </h2>
          <p className="mt-5 text-lg font-medium text-muted-foreground md:text-xl">
            Ready-to-use. No formatting required.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {previews.map((preview, index) => (
            <motion.div
              key={preview.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col"
            >
              <div className="mb-5 flex items-center justify-center gap-2">
                <preview.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase tracking-wider text-primary">
                  {preview.label}
                </span>
              </div>
              <div className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-xl">
                <preview.component />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button asChild size="lg" className="h-16 rounded-2xl px-10 text-lg font-bold shadow-xl shadow-primary/25 transition-all hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5">
            <Link to="/signup">
              Try It Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">No credit card required. Start creating in seconds.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default SeeWhatYouGetSection;
