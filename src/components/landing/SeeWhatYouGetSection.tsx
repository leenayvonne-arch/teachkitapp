import { motion } from "framer-motion";
import { FileText, BookOpen, HelpCircle, ClipboardCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import WorksheetPreview from "@/components/landing/previews/WorksheetPreview";
import LessonPlanPreview from "@/components/landing/previews/LessonPlanPreview";
import QuizPreview from "@/components/landing/previews/QuizPreview";
import ExitTicketPreview from "@/components/landing/previews/ExitTicketPreview";

const previews = [
  { label: "Lesson Plan", component: LessonPlanPreview, icon: BookOpen },
  { label: "Worksheet", component: WorksheetPreview, icon: FileText },
  { label: "Quiz", component: QuizPreview, icon: HelpCircle },
  { label: "Exit Ticket", component: ExitTicketPreview, icon: ClipboardCheck },
];

const SeeWhatYouGetSection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-36">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-60 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            See What You Get
          </h2>
          <p className="mt-4 text-lg font-medium text-muted-foreground md:text-xl">
            Ready-to-use. No formatting required.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {previews.map((preview, index) => (
            <motion.div
              key={preview.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col"
            >
              <div className="mb-4 flex items-center justify-center gap-2">
                <preview.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase tracking-wider text-primary">
                  {preview.label}
                </span>
              </div>
              <div className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-2xl shadow-md shadow-foreground/[0.03]">
                <preview.component />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button asChild size="lg" className="h-16 rounded-2xl px-10 text-lg font-bold shadow-xl shadow-primary/25 transition-all hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5">
            <Link to="/signup">
              Try It Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">No credit card required. Start creating in seconds.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default SeeWhatYouGetSection;
