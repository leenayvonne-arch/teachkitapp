import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { Clock, Sparkles, Users, BookOpen, GraduationCap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const benefits = [
  { icon: Clock, title: "Save Hours Every Week", description: "Generate lesson plans, worksheets, quizzes, and exit tickets in seconds — not hours." },
  { icon: Sparkles, title: "Zero Prep Needed", description: "Just pick a topic, grade level, and subject. TeachKit handles the rest." },
  { icon: Users, title: "Differentiated Instruction", description: "Instantly create multiple versions tailored to different learner levels in your classroom." },
];

const audiences = [
  { icon: BookOpen, label: "Elementary Teachers", description: "Engaging, age-appropriate resources for K–5 classrooms." },
  { icon: GraduationCap, label: "Middle School Teachers", description: "Standards-aligned materials for grades 6–8." },
  { icon: Heart, label: "Special Education Teachers", description: "Differentiated resources with built-in scaffolding and supports." },
];

const AboutPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-extrabold text-foreground md:text-5xl">About TeachKit</h1>
            <p className="text-lg text-muted-foreground">
              TeachKit is an AI-powered teaching assistant that helps educators create high-quality lesson plans, worksheets, quizzes, and exit tickets — in seconds, not hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">Who It's For</h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {audiences.map((a, i) => (
              <motion.div key={a.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl border bg-card p-6 text-center shadow-sm">
                <a.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-1 text-lg font-bold text-foreground">{a.label}</h3>
                <p className="text-sm text-muted-foreground">{a.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">Why Teachers Love TeachKit</h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl border bg-card p-6 text-center shadow-sm">
                <b.icon className="mx-auto mb-3 h-8 w-8 text-secondary" />
                <h3 className="mb-1 text-lg font-bold text-foreground">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Ready to Save Hours Every Week?</h2>
          <p className="mb-6 text-muted-foreground">Join thousands of teachers already using TeachKit.</p>
          <Button asChild size="lg" className="rounded-xl font-bold shadow-md shadow-primary/20">
            <Link to="/signup">Start Free</Link>
          </Button>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default AboutPage;
