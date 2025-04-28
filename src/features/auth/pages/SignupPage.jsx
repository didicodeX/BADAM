import { SignupForm } from "../components/SignupForm";

export default function SignupPage() {
  return (
    <>
      <SignupForm />
      <div className="flex flex-col gap-y-6 padd min-h-screen justify-center">
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
