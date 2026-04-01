import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown, Star, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Try the basics — no credit card needed.",
    features: [
      "Limited worksheet & quiz generation",
      "Basic templates",
      "Watermarked downloads",
      "Community support",
    ],
    cta: "Start Free",
    featured: false,
    icon: Sparkles,
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
    checkColor: "text-secondary",
  },
  {
    name: "Essential",
    price: "$9.99",
    period: "per month",
    description: "More power for everyday teaching.",
    features: [
      "More generations per month",
      "Worksheets, quizzes & exit tickets",
      "No watermark on downloads",
      "Standard templates",
      "Email support",
    ],
    cta: "Upgrade Now",
    featured: false,
    icon: Zap,
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    checkColor: "text-secondary",
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "per month",
    description: "Everything you need to teach smarter.",
    features: [
      "Higher generation limits",
      "Full access to all generators",
      "Priority generation speed",
      "Differentiation support",
      "Premium templates",
      "Lesson Library access",
    ],
    cta: "Upgrade Now",
    featured: true,
    icon: Crown,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    checkColor: "text-primary",
  },
  {
    name: "Premium",
    price: "$29.99",
    period: "per month",
    description: "For power users who want it all.",
    features: [
      "Unlimited generation usage",
      "Everything in Pro",
      "Priority support",
      "Early access to new features",
      "Custom branding (coming soon)",
    ],
    cta: "Upgrade Now",
    featured: false,
    icon: Star,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    checkColor: "text-accent",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="relative bg-muted/30 py-16 md:py-24 overflow-hidden">
      {/* Decorative blobs */}
      <div className="blob blob-purple -top-40 -left-40 h-[400px] w-[400px] animate-blob-drift" />
      <div className="blob blob-coral -bottom-40 -right-40 h-[350px] w-[350px] animate-blob-drift [animation-delay:6s]" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
            Simple, Teacher-Friendly Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free and upgrade when you're ready.
          </p>
          <p className="mt-3 text-sm text-muted-foreground/70 italic">
            Pricing may increase as new features are added.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl border p-6 card-hover ${
                  plan.featured
                    ? "border-primary bg-card shadow-2xl shadow-primary/15 ring-2 ring-primary/25 lg:scale-105 lg:-my-3 z-10"
                    : "border-border bg-card shadow-md shadow-foreground/[0.03]"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-accent text-white px-4 py-1 text-xs font-bold shadow-lg">
                      MOST POPULAR
                    </Badge>
                  </div>
                )}

                <div className="mb-4 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${plan.iconBg} ${plan.iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                </div>

                <p className="mb-5 text-sm text-muted-foreground leading-relaxed">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                  <span className="ml-1 text-sm text-muted-foreground">/{plan.period}</span>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${plan.checkColor}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="w-full rounded-xl h-12 font-bold"
                  variant={plan.featured ? "gradient" : "outline"}
                  size="lg"
                >
                  <Link to="/signup">{plan.cta}</Link>
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Bundle Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-20 max-w-3xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-extrabold text-foreground md:text-3xl">
              Prefer One-Time Resources?
            </h3>
            <p className="mt-2 text-muted-foreground">
              Grab a ready-made bundle — no subscription required.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border-2 border-accent/40 bg-accent/[0.04] p-8 shadow-xl shadow-accent/10 card-hover">
            {/* Gradient accent bar */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-hero" />

            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-accent/10">
                <Package className="h-8 w-8 text-accent" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="mb-2 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                  <h4 className="text-xl font-bold text-foreground">
                    Grades 3–5 Math Classroom Resource Bundle
                  </h4>
                  <Badge className="bg-gradient-accent text-white font-bold shadow-sm">
                    🏆 Best Value
                  </Badge>
                </div>

                <p className="mb-3 text-sm text-muted-foreground italic">
                  Most teachers choose the bundle
                </p>

                <div className="mb-4 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground md:justify-start">
                  <span className="rounded-full bg-muted px-3 py-1 font-medium">📄 Worksheets</span>
                  <span className="rounded-full bg-muted px-3 py-1 font-medium">🎫 Exit Tickets</span>
                  <span className="rounded-full bg-muted px-3 py-1 font-medium">❓ Quizzes</span>
                  <span className="rounded-full bg-muted px-3 py-1 font-medium">✅ Answer Keys</span>
                </div>

                <p className="mb-4 text-sm font-medium text-foreground">
                  ✅ Everything you need for a full month of math instruction
                </p>

                <div className="mb-2 space-y-1 text-sm text-muted-foreground">
                  <p>If purchased separately: <span className="line-through">$25.97</span></p>
                  <p className="text-lg font-extrabold text-foreground">Bundle price: $12.99</p>
                </div>
                <Badge variant="outline" className="text-secondary border-secondary/30 font-semibold">
                  Save over 50%
                </Badge>

                <p className="mt-3 text-xs font-medium text-accent italic">
                  ⏳ Limited Time Launch Price
                </p>
                <p className="text-[11px] text-muted-foreground/60">
                  Early users get this price before it increases.
                </p>
              </div>

              <div className="flex flex-shrink-0 items-center">
                <Button
                  asChild
                  variant="gradient-accent"
                  size="lg"
                  className="rounded-xl h-12 px-8 font-bold"
                >
                  <Link to="/shop/math-classroom-bundle-3-5">Buy Bundle</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust & Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-20 max-w-2xl text-center"
        >
          <div className="rounded-2xl border border-border bg-card/60 px-8 py-10 shadow-sm">
            <h3 className="mb-3 text-xl font-extrabold text-foreground md:text-2xl">
              Satisfaction Guaranteed
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Start free with the AI tools — no credit card required. For shop purchases, if you're not completely satisfied with your resource, contact us within 7 days for a full refund. No questions asked.
            </p>
            <Button asChild variant="gradient" size="lg" className="mt-6 rounded-xl h-12 px-8 font-bold">
              <Link to="/signup">Get Started Free</Link>
            </Button>
            <p className="mt-4 text-sm font-medium text-muted-foreground/70">
              No contracts. Cancel anytime.
            </p>
            <p className="mt-1 text-sm font-medium text-muted-foreground/70">
              7-day money-back guarantee on all shop purchases.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
