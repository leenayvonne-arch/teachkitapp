import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  quote: string;
  name: string;
  tag?: string;
  stars: number;
}

const defaultTestimonials: Testimonial[] = [
  {
    quote: "This saved me so much time during the week. I was able to print and use immediately.",
    name: "4th Grade Teacher",
    tag: "Elementary Teacher",
    stars: 5,
  },
  {
    quote: "My students stayed engaged and the worksheets were easy to follow.",
    name: "3rd Grade Teacher",
    tag: "Elementary Teacher",
    stars: 5,
  },
  {
    quote: "Perfect for quick assessments and daily practice.",
    name: "5th Grade Teacher",
    tag: "Elementary Teacher",
    stars: 5,
  },
  {
    quote: "The exit tickets helped me identify gaps in understanding right away. Game changer!",
    name: "6th Grade Teacher",
    tag: "Middle School Teacher",
    stars: 5,
  },
];

const TeacherTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);

  useEffect(() => {
    const loadFeatured = async () => {
      const { data } = await supabase
        .from("feedback")
        .select("name, grade_level, message")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(8);

      if (data && data.length > 0) {
        const featured: Testimonial[] = data.map((f) => ({
          quote: f.message,
          name: f.name || f.grade_level,
          tag: f.grade_level,
          stars: 5,
        }));
        setTestimonials([...featured, ...defaultTestimonials].slice(0, 8));
      }
    };
    loadFeatured();
  }, []);

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            What Teachers Are Saying
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real feedback from educators using TeachKit
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="flex h-full flex-col shadow-md shadow-foreground/[0.03] border-border transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <CardContent className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <Star
                        key={s}
                        className="h-4 w-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <p className="flex-1 text-sm italic text-foreground leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="mt-auto pt-3 border-t border-border">
                    <p className="text-sm font-bold text-foreground">
                      — {t.name}
                    </p>
                    {t.tag && (
                      <Badge variant="secondary" className="mt-1.5 text-[11px]">
                        {t.tag}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeacherTestimonials;
