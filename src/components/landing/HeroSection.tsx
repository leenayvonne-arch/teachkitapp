import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob blob-purple -top-40 -right-40 h-[500px] w-[500px] animate-blob-drift" />
        <div className="blob blob-teal -bottom-40 -left-40 h-[500px] w-[500px] animate-blob-drift [animation-delay:4s]" />
        <div className="blob blob-coral top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] animate-blob-drift [animation-delay:8s]" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
          >
            AI-powered · Built for K–12
          </motion.div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-medium leading-[1.15] tracking-tight text-foreground md:text-5xl lg:text-[3.5rem]">
            Your complete AI teaching toolkit —{" "}
            <br className="hidden sm:block" />
            <span className="text-primary">built for K–12.</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted-foreground">
            Generate lesson plans, worksheets, and quizzes in seconds. TeachKit
            handles the prep work so you can focus on what you became a teacher
            to do.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl px-7 text-base font-semibold bg-foreground text-background hover:bg-foreground/90"
            >
              <Link to="/signup">
                Generate your first lesson
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-xl px-7 text-base font-semibold border-2"
            >
              <Link to="/#see-what-you-get">See an example output</Link>
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {["No credit card required", "Ready in under 30 seconds", "Free to start"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/15">
                  <Check className="h-2.5 w-2.5 text-primary" />
                </span>
                {item}
              </span>
            ))}
          </div>

          {/* Output pill row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-muted-foreground font-medium">Generates →</span>
            {["Lesson plans", "Worksheets & activities", "Quizzes"].map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-border bg-card px-3.5 py-1 font-medium text-foreground"
              >
                {pill}
              </span>
            ))}
            <span className="rounded-full border border-border/60 bg-muted/50 px-3.5 py-1 font-medium text-muted-foreground italic">
              More coming soon
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
