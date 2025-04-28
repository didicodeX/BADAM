import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <div className="flex flex-col gap-y-6 padd min-h-screen justify-center">
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
