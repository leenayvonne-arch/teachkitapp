import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out TeachKit.",
    features: [
      "5 generations per month",
      "Lesson Plan Generator",
      "Basic templates",
      "Download as PDF",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    description: "Everything you need to teach smarter.",
    features: [
      "Unlimited generations",
      "All generators included",
      "Differentiation support",
      "Premium templates",
      "Priority support",
      "Lesson Library",
    ],
    cta: "Start Free Trial",
    featured: true,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="bg-muted/30 py-24 md:py-36">
      <div className="container mx-auto px-4">
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
            Start for free. Upgrade when you're ready.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-2xl border p-8 transition-all hover:-translate-y-0.5 ${
                plan.featured
                  ? "border-primary bg-card shadow-xl shadow-primary/10 ring-2 ring-primary/20"
                  : "border-border bg-card shadow-md shadow-foreground/[0.03]"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-accent-foreground">
                  MOST POPULAR
                </div>
              )}
              <h3 className="mb-1 text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                <span className="ml-1 text-muted-foreground">/{plan.period}</span>
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="h-4 w-4 flex-shrink-0 text-secondary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`w-full rounded-xl h-12 font-bold transition-all hover:-translate-y-0.5 ${
                  plan.featured
                    ? "shadow-md shadow-primary/20"
                    : ""
                }`}
                variant={plan.featured ? "default" : "outline"}
                size="lg"
              >
                <Link to="/signup">{plan.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
