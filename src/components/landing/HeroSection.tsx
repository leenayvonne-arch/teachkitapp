import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            AI-Powered Teaching Tools
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
            Create Lesson Plans and Classroom Materials{" "}
            <span className="text-primary">in Seconds</span>
          </h1>

          <p className="mb-10 text-lg text-muted-foreground md:text-xl">
            Generate professional lesson plans, worksheets, quizzes, and exit tickets
            instantly — so you can spend more time teaching and less time planning.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="h-14 rounded-2xl px-8 text-lg font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30">
              <Link to="/signup">
                Start Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 rounded-2xl px-8 text-lg font-semibold">
              <a href="#features">See How It Works</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <div className="rounded-2xl border bg-muted/30 p-4 shadow-2xl shadow-primary/5">
            <div className="flex items-center gap-2 border-b pb-3">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-accent/60" />
              <div className="h-3 w-3 rounded-full bg-secondary/60" />
              <span className="ml-2 text-sm text-muted-foreground font-body">TeachKit — Lesson Generator</span>
            </div>
            <div className="mt-4 space-y-3 p-4">
              <div className="h-4 w-3/4 rounded bg-primary/10 animate-pulse-soft" />
              <div className="h-4 w-full rounded bg-primary/5 animate-pulse-soft" style={{ animationDelay: "0.2s" }} />
              <div className="h-4 w-5/6 rounded bg-primary/5 animate-pulse-soft" style={{ animationDelay: "0.4s" }} />
              <div className="mt-6 h-10 w-40 rounded-lg bg-secondary/20 animate-pulse-soft" style={{ animationDelay: "0.6s" }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
