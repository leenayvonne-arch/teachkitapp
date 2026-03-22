import { BookOpen, FileText, HelpCircle, LogOut, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FeedbackForm from "@/components/FeedbackForm";
import { useGenerationLimit } from "@/hooks/useGenerationLimit";

const quickActions = [
  {
    title: "Lesson Plan",
    description: "Generate a full lesson plan",
    icon: BookOpen,
    color: "bg-primary/10 text-primary border-primary/20",
    href: "/dashboard/lessons",
  },
  {
    title: "Worksheet",
    description: "Create a student worksheet",
    icon: FileText,
    color: "bg-secondary/10 text-secondary border-secondary/20",
    href: "/dashboard/worksheets",
  },
  {
    title: "Quiz",
    description: "Build a quiz with answer key",
    icon: HelpCircle,
    color: "bg-accent/10 text-accent border-accent/20",
    href: "/dashboard/quizzes",
  },
  {
    title: "Exit Ticket",
    description: "Quick end-of-class check",
    icon: LogOut,
    color: "bg-destructive/10 text-destructive border-destructive/20",
    href: "/dashboard/exit-tickets",
  },
];

const DashboardHome = () => {
  const { remaining, FREE_LIMIT, loading } = useGenerationLimit();

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-foreground">Welcome to TeachKit</h1>
      <p className="mb-8 text-muted-foreground">What would you like to create today?</p>

      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <p className="text-sm text-foreground">
            <span className="font-semibold">{remaining} free generation{remaining !== 1 ? "s" : ""}</span>{" "}
            remaining this month
          </p>
          {remaining === 0 && (
            <Link to="/pricing" className="ml-auto text-sm font-medium text-primary hover:underline">
              Upgrade →
            </Link>
          )}
        </motion.div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action, i) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to={action.href}
              className={`group flex flex-col items-center gap-3 rounded-2xl border p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg ${action.color}`}
            >
              <action.icon className="h-10 w-10" />
              <div>
                <h3 className="font-semibold">{action.title}</h3>
                <p className="mt-1 text-xs opacity-70">{action.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border bg-card p-8 text-center">
        <h2 className="mb-2 text-lg font-semibold text-foreground">Recent Activity</h2>
        <p className="text-sm text-muted-foreground">Your generated materials will appear here.</p>
      </div>

      <div className="mt-12">
        <FeedbackForm />
      </div>
    </div>
  );
};

export default DashboardHome;
