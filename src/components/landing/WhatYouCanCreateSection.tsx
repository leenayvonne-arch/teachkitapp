import { motion } from "framer-motion";
import { BookOpen, FileText, HelpCircle, ClipboardCheck } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Lesson Plans",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    bulletColor: "bg-primary/60",
    borderHover: "hover:border-primary/30",
    glowHover: "hover:shadow-[0_0_24px_hsl(262_83%_58%/0.12)]",
    bullets: [
      "Standards-aligned",
      "Structured (Hook → Instruction → Practice → Closure)",
      "Includes objectives, vocabulary, and materials",
    ],
  },
  {
    icon: FileText,
    title: "Worksheets",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    bulletColor: "bg-secondary/60",
    borderHover: "hover:border-secondary/30",
    glowHover: "hover:shadow-[0_0_24px_hsl(174_72%_40%/0.12)]",
    bullets: [
      "Printable, student-ready",
      "Includes answer space",
      "Multiple question types",
    ],
  },
  {
    icon: HelpCircle,
    title: "Quizzes",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    bulletColor: "bg-accent/60",
    borderHover: "hover:border-accent/30",
    glowHover: "hover:shadow-[0_0_24px_hsl(12_90%_62%/0.12)]",
    bullets: [
      "Up to 50 questions",
      "Auto-generated from lessons",
      "Answer keys included",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Exit Tickets",
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    bulletColor: "bg-destructive/60",
    borderHover: "hover:border-destructive/30",
    glowHover: "hover:shadow-[0_0_24px_hsl(0_84%_60%/0.12)]",
    bullets: [
      "Quick daily assessments",
      "Easy to print and use",
      "Great for checking understanding",
    ],
  },
];

const WhatYouCanCreateSection = () => {
  return (
    <section className="relative bg-muted/30 py-16 md:py-24 overflow-hidden">
      <div className="blob blob-purple -bottom-40 -right-40 h-[400px] w-[400px] animate-blob-drift [animation-delay:2s]" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            What You Can Create with TeachKit
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Professional teaching materials, generated in seconds.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`rounded-2xl border border-border bg-card p-7 card-hover ${feature.borderHover} ${feature.glowHover}`}
            >
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg}`}>
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>
              <h3 className="mb-3 text-lg font-bold text-card-foreground">
                {feature.title}
              </h3>
              <ul className="space-y-2.5">
                {feature.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                  >
                    <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${feature.bulletColor}`} />
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
