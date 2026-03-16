import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Enter Grade Level & Topic",
    description: "Tell us what you're teaching and we'll handle the rest. Select your grade, subject, and topic.",
  },
  {
    number: "02",
    title: "Generate Materials",
    description: "Our AI creates professional lesson plans, worksheets, quizzes, or exit tickets in seconds.",
  },
  {
    number: "03",
    title: "Download & Use",
    description: "Review, customize if needed, then download and use your materials in class right away.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to transform your lesson planning.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-2xl font-bold shadow-lg shadow-primary/20">
                {step.number}
              </div>
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-0.5 w-1/2 translate-x-full bg-border md:block" />
              )}
              <h3 className="mb-2 text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
