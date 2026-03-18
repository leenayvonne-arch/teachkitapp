import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PricingSection from "@/components/landing/PricingSection";

const PricingPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="py-8">
      <PricingSection />
    </main>
    <Footer />
  </div>
);

export default PricingPage;
