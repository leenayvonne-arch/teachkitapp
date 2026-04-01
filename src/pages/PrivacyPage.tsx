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
          <p className="text-sm text-muted-foreground">Last updated: April 2026</p>

          <p className="text-muted-foreground mt-6">
            This policy applies to teachkitapp.com and all TeachKit services. By using TeachKit, you agree to the collection and use of information described here.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8">1. Information We Collect</h2>
          <p className="text-muted-foreground">We collect the following types of information when you use TeachKit:</p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li><strong className="text-foreground">Account information</strong> — your name and email address when you create an account.</li>
            <li><strong className="text-foreground">Payment information</strong> — billing details processed securely through Stripe. TeachKit never stores your full credit card number on our servers.</li>
            <li><strong className="text-foreground">Usage data</strong> — the resources you generate, grade levels and subjects selected, and how you interact with the platform. This helps us improve TeachKit.</li>
            <li><strong className="text-foreground">Device and browser data</strong> — IP address, browser type, and device information collected automatically via cookies and analytics tools.</li>
            <li><strong className="text-foreground">Communications</strong> — any messages you send to our support team.</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-8">2. How We Use Your Information</h2>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li>To provide, operate, and improve the TeachKit platform and your generated resources.</li>
            <li>To process payments and send receipts for purchases made through the Resource Shop.</li>
            <li>To send product updates, new feature announcements, and occasional promotional emails. You may unsubscribe at any time.</li>
            <li>To respond to support requests and account inquiries.</li>
            <li>To detect and prevent fraud, abuse, or unauthorized access.</li>
          </ul>
          <p className="text-muted-foreground font-semibold">We never sell your personal data to third parties.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">3. AI-Generated Content</h2>
          <p className="text-muted-foreground">TeachKit uses third-party AI services to generate lesson plans, worksheets, quizzes, and exit tickets based on your inputs (grade level, subject, topic).</p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li>Your inputs and generated outputs are used solely to deliver your requested resource.</li>
            <li>We do not use your generated content to train AI models without your explicit consent.</li>
            <li>Generated resources are stored privately in your account and are not shared with other users.</li>
            <li>AI-generated content is provided as a starting point. TeachKit does not guarantee curriculum alignment for every state standard and recommends reviewing all materials before classroom use.</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-8">4. Payment Data</h2>
          <p className="text-muted-foreground">
            All payment transactions are processed by Stripe, Inc., a PCI-DSS compliant payment processor. TeachKit does not store, log, or have access to your full card number, CVV, or bank account details. For Stripe's privacy practices, visit{" "}
            <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">stripe.com/privacy</a>.
          </p>
          <p className="text-muted-foreground">
            For Resource Shop purchases, you will receive an email receipt and immediate access to your downloaded files. Refund requests must be submitted within 7 days of purchase.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8">5. Cookies and Tracking</h2>
          <p className="text-muted-foreground">TeachKit uses cookies and similar tracking technologies to:</p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li>Keep you logged in to your account.</li>
            <li>Understand how visitors use the site (via analytics tools such as Google Analytics).</li>
            <li>Remember your preferences and settings.</li>
          </ul>
          <p className="text-muted-foreground">You may disable cookies in your browser settings, but some features of TeachKit may not function correctly without them.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">6. Third-Party Services</h2>
          <p className="text-muted-foreground">TeachKit uses the following third-party services, each governed by their own privacy policies:</p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li><strong className="text-foreground">Stripe</strong> — payment processing</li>
            <li><strong className="text-foreground">Google Analytics</strong> — usage analytics</li>
            <li><strong className="text-foreground">Anthropic / OpenAI</strong> — AI content generation</li>
            <li><strong className="text-foreground">Lovable</strong> — platform infrastructure</li>
          </ul>
          <p className="text-muted-foreground">We only share data with these services to the extent necessary to provide TeachKit's features.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">7. Children's Privacy (COPPA)</h2>
          <p className="text-muted-foreground">TeachKit is designed for use by teachers and adult educators. We do not knowingly collect personal information from children under the age of 13.</p>
          <p className="text-muted-foreground">
            TeachKit is not intended to be accessed directly by students. If you are a teacher using TeachKit in a school setting, please do not enter any student names, student IDs, or personally identifiable student information into the platform when generating resources.
          </p>
          <p className="text-muted-foreground">
            If we become aware that we have inadvertently collected personal data from a child under 13, we will delete it promptly. Contact us at{" "}
            <a href="mailto:support@teachkitapp.com" className="text-primary hover:underline">support@teachkitapp.com</a> if you have concerns.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8">8. Data Retention</h2>
          <p className="text-muted-foreground">
            We retain your account data and generated resources for as long as your account is active. If you delete your account, your personal data and stored resources will be permanently deleted within 30 days. Payment records may be retained for up to 7 years as required by law.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8">9. Your Rights</h2>
          <p className="text-muted-foreground">Depending on your location, you may have the right to:</p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your account and associated data.</li>
            <li>Opt out of marketing communications at any time.</li>
            <li><strong className="text-foreground">Data portability</strong> — receive a copy of your data in a readable format.</li>
          </ul>
          <p className="text-muted-foreground">
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:support@teachkitapp.com" className="text-primary hover:underline">support@teachkitapp.com</a>.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8">10. Changes to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page and notify active users by email for any material changes.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8">11. Contact</h2>
          <p className="text-muted-foreground">
            For privacy-related inquiries, email us at{" "}
            <a href="mailto:support@teachkitapp.com" className="text-primary hover:underline">support@teachkitapp.com</a>. We aim to respond within 2 business days.
          </p>
        </motion.div>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPage;
