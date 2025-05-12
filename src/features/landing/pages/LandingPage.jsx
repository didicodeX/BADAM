import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth.store";
import HeroSection from "../components/HeroSection";
import FeaturedTrainingsSection from "../components/FeaturedTrainingsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import WhyBadamSection from "../components/WhyBadamSection";
import FaqSection from "../components/FaqSection";
import CtaFooterSection from "../components/CtaFooterSection";

// LandingPage.jsx
export default function LandingPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);
  console.log(user);
   return (
    <main className="flex flex-col gap-6 pt-6">
      <HeroSection />
      <FeaturedTrainingsSection />
      <TestimonialsSection />
      <WhyBadamSection />
      <FaqSection />
      <CtaFooterSection />
    </main>
  );
}
