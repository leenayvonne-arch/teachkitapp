import { motion } from "framer-motion";
import { Clock, Printer, School, SlidersHorizontal } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save Hours Every Week",
    description: "Stop spending nights creating materials from scratch.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    glowHover: "hover:shadow-[0_0_24px_hsl(262_83%_58%/0.12)]",
    borderHover: "hover:border-primary/30",
  },
  {
    icon: Printer,
    title: "No Prep Required",
    description: "Print and use immediately.",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    glowHover: "hover:shadow-[0_0_24px_hsl(174_72%_40%/0.12)]",
    borderHover: "hover:border-secondary/30",
  },
  {
    icon: School,
    title: "Works for Any Classroom",
    description: "Perfect for elementary, middle, and differentiated instruction.",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    glowHover: "hover:shadow-[0_0_24px_hsl(12_90%_62%/0.12)]",
    borderHover: "hover:border-accent/30",
  },
  {
    icon: SlidersHorizontal,
    title: "Flexible and Customizable",
    description: "Generate exactly what you need, when you need it.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    glowHover: "hover:shadow-[0_0_24px_hsl(262_83%_58%/0.12)]",
    borderHover: "hover:border-primary/30",
  },
];

const BuiltForClassroomsSection = () => {
  return (
    <section id="about" className="relative bg-muted/30 py-16 md:py-24 overflow-hidden">
      <div className="blob blob-coral -top-32 -right-32 h-[350px] w-[350px] animate-blob-drift [animation-delay:5s]" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Built for Real Classroom Needs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Designed by educators, for educators.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`flex items-start gap-5 rounded-2xl border border-border bg-card p-6 card-hover ${benefit.borderHover} ${benefit.glowHover}`}
            >
              <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${benefit.iconBg}`}>
                <benefit.icon className={`h-6 w-6 ${benefit.iconColor}`} />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">{benefit.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuiltForClassroomsSection;
