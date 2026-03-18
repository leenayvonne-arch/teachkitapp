import { motion } from "framer-motion";
import { BookOpen, FileText, HelpCircle, ClipboardCheck } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Lesson Plans",
    bullets: [
      "Standards-aligned",
      "Structured (Hook → Instruction → Practice → Closure)",
      "Includes objectives, vocabulary, and materials",
    ],
  },
  {
    icon: FileText,
    title: "Worksheets",
    bullets: [
      "Printable, student-ready",
      "Includes answer space",
      "Multiple question types",
    ],
  },
  {
    icon: HelpCircle,
    title: "Quizzes",
    bullets: [
      "Up to 50 questions",
      "Auto-generated from lessons",
      "Answer keys included",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Exit Tickets",
    bullets: [
      "Quick daily assessments",
      "Easy to print and use",
      "Great for checking understanding",
    ],
  },
];

const WhatYouCanCreateSection = () => {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            What You Can Create with TeachKit
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-card-foreground">
                {feature.title}
              </h3>
              <ul className="space-y-2">
                {feature.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouCanCreateSection;
