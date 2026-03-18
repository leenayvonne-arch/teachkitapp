import { motion } from "framer-motion";
import { Clock, Printer, School, SlidersHorizontal } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save Hours Every Week",
    description: "Stop spending nights creating materials from scratch.",
  },
  {
    icon: Printer,
    title: "No Prep Required",
    description: "Print and use immediately.",
  },
  {
    icon: School,
    title: "Works for Any Classroom",
    description: "Perfect for elementary, middle, and differentiated instruction.",
  },
  {
    icon: SlidersHorizontal,
    title: "Flexible and Customizable",
    description: "Generate exactly what you need, when you need it.",
  },
];

const BuiltForClassroomsSection = () => {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center text-3xl font-extrabold tracking-tight text-foreground md:text-4xl"
        >
          Built for Real Classroom Needs
        </motion.h2>

        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <benefit.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">{benefit.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuiltForClassroomsSection;
