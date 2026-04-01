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
          <p className="text-sm text-muted-foreground">Last updated: April 2026</p>

          <p className="text-muted-foreground mt-6">
            These Terms of Service ("Terms") govern your access to and use of TeachKit, available at teachkitapp.com. By creating an account or using any part of the service, you agree to be bound by these Terms. If you do not agree, please do not use TeachKit.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8">1. Description of Service</h2>
          <p className="text-muted-foreground">TeachKit is an AI-powered platform that helps K–12 educators create lesson plans, worksheets, quizzes, and exit tickets. The service includes:</p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li><strong className="text-foreground">AI generators</strong> — tools that produce educational resources based on your selected grade level, subject, and topic.</li>
            <li><strong className="text-foreground">Resource Shop</strong> — a marketplace for downloadable, ready-made resource packs.</li>
            <li><strong className="text-foreground">Lesson Library</strong> — a personal library where your generated resources are saved for future access.</li>
          </ul>
          <p className="text-muted-foreground">The service is provided "as is" and may be updated, modified, or discontinued at any time without prior notice.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">2. Account Registration</h2>
          <p className="text-muted-foreground">To use TeachKit, you must create an account with a valid email address. You agree to:</p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li>Provide accurate and complete information during registration.</li>
            <li>Keep your login credentials confidential and not share your account with others.</li>
            <li>Notify us immediately if you suspect unauthorized access to your account.</li>
          </ul>
          <p className="text-muted-foreground">You are responsible for all activity that occurs under your account. TeachKit reserves the right to suspend or terminate accounts that violate these Terms.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">3. Free Tier and Usage Limits</h2>
          <p className="text-muted-foreground">TeachKit offers a free tier with a limited number of AI generations per month. Usage limits may change at any time. If you exceed the free tier limit, you will be prompted to wait until your limit resets or upgrade to a paid plan when available.</p>
          <p className="text-muted-foreground">We reserve the right to modify, restrict, or discontinue free access at any time without obligation.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">4. Payments and Purchases</h2>
          <p className="text-muted-foreground">Purchases made through the TeachKit Resource Shop are processed securely by Stripe, Inc. By making a purchase, you agree to the following:</p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li>All prices are listed in USD and are charged at the time of purchase.</li>
            <li>You will receive an email receipt and immediate access to your purchased files.</li>
            <li>Digital products are non-refundable after download, except within 7 days of purchase if the product is defective or not as described.</li>
            <li>TeachKit does not store your full credit card details. All payment data is handled by Stripe in compliance with PCI-DSS standards.</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-8">5. User Content and Ownership</h2>
          <p className="text-muted-foreground">All content you generate using TeachKit — including lesson plans, worksheets, quizzes, and exit tickets — belongs to you. You may use, modify, print, and distribute your generated materials for educational purposes without restriction.</p>
          <p className="text-muted-foreground">By using the platform, you grant TeachKit a limited, non-exclusive license to store and process your inputs solely for the purpose of delivering the requested resource. We do not claim ownership of your content.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">6. AI-Generated Content Disclaimer</h2>
          <p className="text-muted-foreground">TeachKit uses third-party AI services to generate educational resources. While we strive for accuracy and quality:</p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li>AI-generated content is provided as a starting point and may contain errors, inaccuracies, or content not aligned with specific state or district standards.</li>
            <li>You are responsible for reviewing, editing, and verifying all generated materials before use in a classroom setting.</li>
            <li>TeachKit does not guarantee that generated content meets any particular curriculum framework, standard, or pedagogical requirement.</li>
            <li>TeachKit is not liable for any consequences arising from the use of AI-generated content in educational settings.</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-8">7. Prohibited Uses</h2>
          <p className="text-muted-foreground">You agree not to use TeachKit to:</p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li>Generate content that is harmful, abusive, discriminatory, or inappropriate for educational settings.</li>
            <li>Attempt to reverse-engineer, decompile, or extract the underlying AI models or proprietary systems.</li>
            <li>Resell, redistribute, or commercially exploit generated content as standalone AI-generated products without modification.</li>
            <li>Use automated scripts, bots, or scrapers to access the service in a manner that exceeds normal usage.</li>
            <li>Violate any applicable local, state, national, or international law.</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-8">8. Intellectual Property</h2>
          <p className="text-muted-foreground">The TeachKit name, logo, website design, and all original platform content are the intellectual property of TeachKit and are protected by applicable copyright and trademark laws.</p>
          <p className="text-muted-foreground">You may not copy, modify, or distribute any part of the TeachKit platform (excluding your own generated content) without prior written permission.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">9. Termination</h2>
          <p className="text-muted-foreground">We may suspend or terminate your account at any time if you violate these Terms or engage in conduct that we determine, at our sole discretion, to be harmful to other users or to TeachKit.</p>
          <p className="text-muted-foreground">Upon termination:</p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li>Your access to the platform will be revoked immediately.</li>
            <li>Your saved resources and account data will be deleted within 30 days.</li>
            <li>Any active purchases or downloads already completed will remain accessible per the terms of the original transaction.</li>
          </ul>
          <p className="text-muted-foreground">You may also delete your account at any time by contacting us at{" "}
            <a href="mailto:support@teachkitapp.com" className="text-primary hover:underline">support@teachkitapp.com</a>.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8">10. Limitation of Liability</h2>
          <p className="text-muted-foreground">To the fullest extent permitted by law, TeachKit and its owners, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service, including but not limited to:</p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li>Errors or inaccuracies in AI-generated content.</li>
            <li>Loss of data or saved resources due to system failures.</li>
            <li>Unauthorized access to your account resulting from your failure to secure your credentials.</li>
            <li>Service interruptions, downtime, or discontinuation of features.</li>
          </ul>
          <p className="text-muted-foreground">Our total liability for any claim related to the service shall not exceed the amount you have paid to TeachKit in the 12 months preceding the claim.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">11. Changes to These Terms</h2>
          <p className="text-muted-foreground">We reserve the right to update these Terms at any time. When we make material changes, we will update the "Last updated" date at the top of this page and notify active users by email.</p>
          <p className="text-muted-foreground">Continued use of TeachKit after changes are posted constitutes acceptance of the updated Terms. If you do not agree with the revised Terms, you should discontinue use of the service.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">12. Governing Law</h2>
          <p className="text-muted-foreground">These Terms are governed by and construed in accordance with the laws of the State of Massachusetts, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Massachusetts.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">13. Eligibility</h2>
          <p className="text-muted-foreground">TeachKit is intended for use by adults aged 18 and older. Users between the ages of 13 and 17 may use the service only with verifiable parental or guardian consent. TeachKit does not knowingly permit children under the age of 13 to create accounts or use the service. If we become aware that a user is under 13, their account will be terminated immediately.</p>

          <h2 className="text-xl font-bold text-foreground mt-8">14. Contact</h2>
          <p className="text-muted-foreground">
            If you have questions about these Terms, please contact us at{" "}
            <a href="mailto:support@teachkitapp.com" className="text-primary hover:underline">support@teachkitapp.com</a>. We aim to respond within 2 business days.
          </p>
        </motion.div>
      </div>
    </main>
    <Footer />
  </div>
);

export default TermsPage;
