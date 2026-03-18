import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";

const TermsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold text-foreground">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Last updated: March 2026</p>

          <h2 className="text-xl font-bold text-foreground mt-8">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">By accessing or using TeachKit, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">2. Description of Service</h2>
          <p className="text-muted-foreground">TeachKit provides AI-powered tools for educators to generate lesson plans, worksheets, quizzes, and exit tickets. The service is provided "as is" and may be updated at any time.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">3. User Content</h2>
          <p className="text-muted-foreground">All content generated through TeachKit is yours to use in your educational practice. You retain ownership of any materials you create using the platform.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">4. Account Responsibilities</h2>
          <p className="text-muted-foreground">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">5. Modifications</h2>
          <p className="text-muted-foreground">We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the updated terms.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">6. Contact</h2>
          <p className="text-muted-foreground">If you have questions about these terms, please contact us at <a href="mailto:support@teachkit.app" className="text-primary hover:underline">support@teachkit.app</a>.</p>
        </motion.div>
      </div>
    </main>
    <Footer />
  </div>
);

export default TermsPage;
