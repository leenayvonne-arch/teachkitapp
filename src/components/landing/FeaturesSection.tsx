import { motion } from "framer-motion";
import { BookOpen, FileText, HelpCircle, LogOut, Users, Sparkles } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Lesson Plan Generator",
    description: "Generate standards-aligned lesson plans with objectives, activities, and assessments in seconds.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FileText,
    title: "Worksheet Generator",
    description: "Create engaging, differentiated worksheets tailored to your students' needs and learning levels.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: HelpCircle,
    title: "Quiz Generator",
    description: "Build formative and summative quizzes with multiple question types and answer keys.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: LogOut,
    title: "Exit Ticket Generator",
    description: "Quickly create exit tickets to check for understanding at the end of every lesson.",
    color: "bg-destructive/10 text-destructive",
  },
  {
    icon: Users,
    title: "Differentiation Support",
    description: "Automatically adjust materials for different reading levels, ELL students, and IEP accommodations.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Quality",
    description: "Every resource is professionally formatted and ready to use — no editing required.",
    color: "bg-secondary/10 text-secondary",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-background py-24 md:py-36">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
            Everything You Need to Teach Smarter
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful AI tools designed specifically for educators.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-border bg-card p-7 shadow-md shadow-foreground/[0.03] transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
