import { motion } from "framer-motion";
import { FileText, BookOpen, HelpCircle } from "lucide-react";

const WorksheetPreview = () => (
  <div className="rounded-lg border border-border bg-white p-5 font-serif text-[11px] leading-relaxed text-gray-800 shadow-sm">
    <div className="mb-3 rounded bg-gradient-to-r from-primary/80 to-primary px-3 py-2 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground">TeachKit Worksheet</p>
      <p className="text-xs font-bold text-primary-foreground">Fractions &amp; Decimals</p>
    </div>
    <div className="mb-3 flex justify-between border-b border-dashed border-gray-300 pb-2 text-[10px] text-gray-500">
      <span>Name: _______________</span>
      <span>Date: ________</span>
    </div>
    <div className="space-y-3">
      <div className="rounded border border-gray-200 bg-gray-50/60 p-2.5">
        <p className="mb-1.5 font-bold text-gray-700">
          <span className="mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-[9px] font-bold text-primary">1</span>
          Convert 3/4 to a decimal.
        </p>
        <div className="mt-2 space-y-1.5">
          <div className="h-px w-full border-b border-dotted border-gray-300" />
          <div className="h-px w-full border-b border-dotted border-gray-300" />
        </div>
      </div>
      <div className="rounded border border-gray-200 bg-gray-50/60 p-2.5">
        <p className="mb-1.5 font-bold text-gray-700">
          <span className="mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-[9px] font-bold text-primary">2</span>
          Which is greater: 0.6 or 5/8?
        </p>
        <div className="mt-2 space-y-1.5">
          <div className="h-px w-full border-b border-dotted border-gray-300" />
          <div className="h-px w-full border-b border-dotted border-gray-300" />
        </div>
      </div>
    </div>
    <div className="mt-3 border-t border-gray-200 pt-2 text-center text-[9px] text-gray-400">
      Page 1 of 2
    </div>
  </div>
);

const LessonPlanPreview = () => (
  <div className="rounded-lg border border-border bg-white p-5 font-serif text-[11px] leading-relaxed text-gray-800 shadow-sm">
    <div className="mb-3 rounded bg-gradient-to-r from-primary/80 to-primary px-3 py-2 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground">TeachKit Lesson Plan</p>
      <p className="text-xs font-bold text-primary-foreground">Introduction to Photosynthesis</p>
    </div>
    <div className="mb-3 flex gap-3 text-[10px] text-gray-500">
      <span className="rounded bg-gray-100 px-1.5 py-0.5">Grade 5</span>
      <span className="rounded bg-gray-100 px-1.5 py-0.5">Science</span>
      <span className="rounded bg-gray-100 px-1.5 py-0.5">45 min</span>
    </div>
    <div className="space-y-2.5">
      <div>
        <p className="mb-1 font-bold text-primary">Objective</p>
        <p className="text-gray-600">Students will explain how plants convert sunlight into energy through photosynthesis.</p>
      </div>
      <div>
        <p className="mb-1 font-bold text-primary">Hook (5 min)</p>
        <p className="text-gray-600">Show a wilting plant vs. a healthy plant. Ask: "What does this plant need to survive?"</p>
      </div>
      <div>
        <p className="mb-1 font-bold text-primary">Direct Instruction (15 min)</p>
        <p className="text-gray-600">Introduce the photosynthesis equation using a labeled diagram...</p>
      </div>
      <div>
        <p className="mb-1 font-bold text-primary">Vocabulary</p>
        <p className="text-gray-600">Chlorophyll, glucose, carbon dioxide, oxygen</p>
      </div>
    </div>
  </div>
);

const QuizPreview = () => (
  <div className="rounded-lg border border-border bg-white p-5 font-serif text-[11px] leading-relaxed text-gray-800 shadow-sm">
    <div className="mb-3 rounded bg-gradient-to-r from-primary/80 to-primary px-3 py-2 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground">TeachKit Quiz</p>
      <p className="text-xs font-bold text-primary-foreground">American Revolution</p>
    </div>
    <div className="mb-3 flex justify-between border-b border-dashed border-gray-300 pb-2 text-[10px] text-gray-500">
      <span>Name: _______________</span>
      <span>Score: ____ / 10</span>
    </div>
    <div className="space-y-3">
      <div>
        <p className="mb-1 font-bold text-gray-700">1. Multiple Choice</p>
        <p className="mb-1.5 text-gray-600">What year did the Declaration of Independence get signed?</p>
        <div className="grid grid-cols-2 gap-1 text-gray-500">
          <p>○ A) 1774</p>
          <p>○ B) 1776</p>
          <p>○ C) 1781</p>
          <p>○ D) 1783</p>
        </div>
      </div>
      <div>
        <p className="mb-1 font-bold text-gray-700">2. True or False</p>
        <p className="mb-1 text-gray-600">The Boston Tea Party occurred in 1773.</p>
        <p className="text-gray-500">○ True &nbsp;&nbsp; ○ False</p>
      </div>
      <div>
        <p className="mb-1 font-bold text-gray-700">3. Short Answer</p>
        <p className="mb-1.5 text-gray-600">Name two causes of the American Revolution.</p>
        <div className="h-px w-full border-b border-dotted border-gray-300" />
      </div>
    </div>
  </div>
);

const previews = [
  { label: "Lesson Plan", component: LessonPlanPreview, icon: BookOpen },
  { label: "Worksheet", component: WorksheetPreview, icon: FileText },
  { label: "Quiz", component: QuizPreview, icon: HelpCircle },
];

const SeeWhatYouGetSection = () => {
  return (
    <section className="relative overflow-hidden bg-muted/40 py-20 md:py-28">
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
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            See What You Get
          </h2>
          <p className="mt-4 text-lg font-medium text-muted-foreground md:text-xl">
            Ready-to-use. No formatting required.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-3">
          {previews.map((preview, index) => (
            <motion.div
              key={preview.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col"
            >
              <div className="mb-4 flex items-center justify-center gap-2">
                <preview.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase tracking-wider text-primary">
                  {preview.label}
                </span>
              </div>
              <div className="transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg rounded-xl">
                <preview.component />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeeWhatYouGetSection;
