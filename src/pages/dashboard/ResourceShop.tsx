import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";

const products = [
  {
    title: "100 Exit Tickets – Grades 3–5",
    description: "Ready-to-print exit tickets across Math, ELA, Science, and Social Studies.",
    gradeLevel: "Grades 3–5",
    price: "$4.99",
    category: "Exit Tickets",
  },
  {
    title: "100 Exit Tickets – Grades 6–8",
    description: "Middle school exit tickets with critical thinking and analytical prompts.",
    gradeLevel: "Grades 6–8",
    price: "$4.99",
    category: "Exit Tickets",
  },
  {
    title: "Differentiated Lesson Plan Bundle",
    description: "Pre-built lesson plans with Simplified, Advanced, ELL, and IEP versions included.",
    gradeLevel: "Grades 3–8",
    price: "$9.99",
    category: "Lesson Plans",
  },
  {
    title: "Math Worksheet Mega Pack",
    description: "50 printable math worksheets covering fractions, geometry, and word problems.",
    gradeLevel: "Grades 3–5",
    price: "$6.99",
    category: "Worksheets",
  },
  {
    title: "Reading Comprehension Toolkit",
    description: "Passages and questions designed to build close-reading skills for middle schoolers.",
    gradeLevel: "Grades 6–8",
    price: "$7.99",
    category: "ELA",
  },
  {
    title: "Science Lab Report Templates",
    description: "Scaffolded lab report templates with vocabulary support and sentence starters.",
    gradeLevel: "Grades 4–8",
    price: "$3.99",
    category: "Science",
  },
  {
    title: "Social Studies Project Pack",
    description: "Research project guides, rubrics, and graphic organizers for history units.",
    gradeLevel: "Grades 5–8",
    price: "$5.99",
    category: "Social Studies",
  },
  {
    title: "Classroom Quiz Builder Kit",
    description: "100 quiz questions with answer keys across core subjects, ready to customize.",
    gradeLevel: "Grades 3–8",
    price: "$4.99",
    category: "Quizzes",
  },
];

const ResourceShop = () => {
  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <ShoppingBag className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Teacher Resource Shop</h1>
          <p className="text-sm text-muted-foreground">Digital products to save you time in the classroom</p>
        </div>
      </div>

      <h2 className="mb-4 text-lg font-semibold text-foreground">Featured Products</h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, i) => (
          <motion.div
            key={product.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="secondary" className="text-[11px]">{product.category}</Badge>
                  <Badge variant="outline" className="text-[11px]">{product.gradeLevel}</Badge>
                </div>
                <h3 className="text-base font-semibold leading-snug text-foreground">{product.title}</h3>
              </CardHeader>
              <CardContent className="flex-1 pb-4">
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t pt-4">
                <span className="text-lg font-bold text-foreground">{product.price}</span>
                <Button size="sm">View Details</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResourceShop;
