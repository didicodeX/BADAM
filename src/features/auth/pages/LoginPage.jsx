import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { useAuthStore } from "../store/auth.store";

export default function LoginPage() {
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
        <LoginForm />
      <div className="flex flex-col gap-y-6 padd-x min-h-screen justify-center">
        <h3>Connectez-vous à votre espace BADAM</h3>
        <p>
          Saisissez votre adresse e-mail et votre mot de passe pour accéder à
          votre compte BADAM. Retrouvez vos sessions, suivez votre progression,
          échangez des avis et explorez les meilleures formations adaptées à
          votre profil.
        </p>
      </div>
    </>
  );
}
