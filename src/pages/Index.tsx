import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import SeeWhatYouGetSection from "@/components/landing/SeeWhatYouGetSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import EarlyAccessSection from "@/components/EarlyAccessSection";
import Footer from "@/components/landing/Footer";

const PricingTeaser = () => (
  <section className="bg-background py-16 md:py-20">
    <div className="container mx-auto px-4 text-center">
      <p className="text-2xl md:text-3xl font-bold text-foreground">
        Free to start. Upgrade when you're ready.
      </p>
      <Link
        to="/pricing"
        className="mt-4 inline-block text-base font-semibold text-primary hover:underline"
      >
        See all plans →
      </Link>
    </div>
  </section>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Navbar />
      <HeroSection />
      <SeeWhatYouGetSection />
      <HowItWorksSection />
      <PricingTeaser />
      <EarlyAccessSection />
      <Footer />
    </div>
  );
};

export default Index;
