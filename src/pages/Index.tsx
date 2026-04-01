import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import WhatYouCanCreateSection from "@/components/landing/WhatYouCanCreateSection";
import SeeWhatYouGetSection from "@/components/landing/SeeWhatYouGetSection";
import BuiltForClassroomsSection from "@/components/landing/BuiltForClassroomsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PricingSection from "@/components/landing/PricingSection";
import EarlyAccessSection from "@/components/EarlyAccessSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Navbar />
      <HeroSection />
      <WhatYouCanCreateSection />
      <SeeWhatYouGetSection />
      <BuiltForClassroomsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <EarlyAccessSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
