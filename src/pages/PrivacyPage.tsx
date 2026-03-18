import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";

const PrivacyPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold text-foreground">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: March 2026</p>

          <h2 className="text-xl font-bold text-foreground mt-8">1. Information We Collect</h2>
          <p className="text-muted-foreground">We collect information you provide when creating an account, including your name and email address. We also collect usage data to improve the service.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">2. How We Use Your Information</h2>
          <p className="text-muted-foreground">Your information is used to provide and improve TeachKit's services, communicate updates, and ensure account security. We never sell your personal data.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">3. Data Security</h2>
          <p className="text-muted-foreground">We implement industry-standard security measures to protect your data. Your generated resources are stored securely and remain private to your account.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">4. Third-Party Services</h2>
          <p className="text-muted-foreground">TeachKit may use third-party services for analytics and infrastructure. These services are bound by their own privacy policies.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">5. Your Rights</h2>
          <p className="text-muted-foreground">You may request access to, correction of, or deletion of your personal data at any time by contacting us.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">6. Contact</h2>
          <p className="text-muted-foreground">For privacy-related inquiries, email us at <a href="mailto:support@teachkit.app" className="text-primary hover:underline">support@teachkit.app</a>.</p>
        </motion.div>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPage;
