import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import WhatYouCanCreateSection from "@/components/landing/WhatYouCanCreateSection";
import SeeWhatYouGetSection from "@/components/landing/SeeWhatYouGetSection";
import BuiltForClassroomsSection from "@/components/landing/BuiltForClassroomsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PricingSection from "@/components/landing/PricingSection";
import TeacherTestimonials from "@/components/TeacherTestimonials";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WhatYouCanCreateSection />
      <SeeWhatYouGetSection />
      <BuiltForClassroomsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TeacherTestimonials />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
