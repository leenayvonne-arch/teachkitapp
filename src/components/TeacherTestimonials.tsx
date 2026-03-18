import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const testimonials = [
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

const TeacherTestimonials = () => (
  <section className="py-16 px-4">
    <div className="mx-auto max-w-6xl">
      <h2 className="mb-2 text-center text-2xl font-bold text-foreground">
        What Teachers Are Saying
      </h2>
      <p className="mb-10 text-center text-sm text-muted-foreground">
        Real feedback from educators using TeachKit
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="flex h-full flex-col">
              <CardContent className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="flex-1 text-sm italic text-foreground">
                  "{t.quote}"
                </p>
                <div className="mt-auto pt-2 border-t">
                  <p className="text-sm font-semibold text-foreground">
                    — {t.name}
                  </p>
                  {t.tag && (
                    <Badge variant="secondary" className="mt-1 text-[11px]">
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

export default TeacherTestimonials;
