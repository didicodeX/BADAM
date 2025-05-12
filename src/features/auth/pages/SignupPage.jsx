import { SignupForm } from "../components/SignupForm";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SignupPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);
  console.log(user);
  
  return (
    <>
      <SignupForm />
      <div className="flex flex-col gap-y-6 padd-x min-h-screen justify-center">
        <h3>Une plateforme pédagogique pour les apprenants ambitieux</h3>
        <p>
          BADAM vous aide à suivre vos formations, à laisser des avis, à évaluer
          vos progrès et à découvrir les meilleures sessions selon vos
          préférences. Apprenez, partagez et progressez sur une interface
          simple, moderne et accessible partout.
        </p>
      </div>
    </>
  );
}
