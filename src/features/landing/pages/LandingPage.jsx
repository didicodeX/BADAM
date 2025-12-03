import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth.store";
import Hero from "../components/Hero";
import Faq from "../components/Faq";
import CTA from "../components/CTA";
import WhyBadam from "../components/WhyBadam";
import Avis from "../components/Avis";
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
    <div className="min-h-screen flex flex-col items-center justify-center">
      
      <Hero/>
      <Avis/>
      <WhyBadam/>
      <Faq/>
      <CTA/>
      
      
    </div>
  );
}
