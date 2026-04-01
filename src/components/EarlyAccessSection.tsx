import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EarlyAccessSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're on the list! We'll be in touch soon.");
    setEmail("");
  };

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Join the teachers already getting their time back.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            TeachKit is growing fast. Get free access now and be among the first to experience AI-powered lesson planning built for K–12.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Input
              type="email"
              placeholder="Enter your school email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 w-full max-w-sm rounded-xl text-base"
            />
            <Button type="submit" variant="gradient" size="lg" className="h-12 rounded-xl px-8 text-base font-bold">
              Get free access
            </Button>
          </form>

          <p className="mt-5 text-sm text-muted-foreground">
            ✓ No credit card required &nbsp;·&nbsp; ✓ Free to start &nbsp;·&nbsp; ✓ Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EarlyAccessSection;
