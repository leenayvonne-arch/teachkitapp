import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
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
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary"
          >
            <Sparkles className="h-4 w-4" />
            AI-Powered Teaching Tools
          </motion.div>

          <h1 className="mb-8 text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            AI Tools & Ready-Made{" "}
            <span className="inline-block bg-gradient-hero bg-clip-text text-transparent whitespace-nowrap">
              Teacher Resources
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
            Generate standards-aligned lesson plans, worksheets, quizzes, and exit tickets
            in seconds — or browse our teacher-made resource shop.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild variant="gradient" size="lg" className="h-16 rounded-2xl px-10 text-lg font-bold">
              <Link to="/signup">
                Start Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-16 rounded-2xl px-10 text-lg font-semibold border-2 hover:-translate-y-0.5 transition-all">
              <Link to="/shop">Browse Resources</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            ✓ Free to start &nbsp;&nbsp; ✓ No credit card required &nbsp;&nbsp; ✓ Built for K-12 teachers
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
