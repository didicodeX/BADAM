import Button from "@/shared/components/Button";

export default function CtaFooterSection() {
  return (
    <section className="flex flex-col items-center py-6 gap-6 text-center">
      <div>
        <h4>
          Prêt à rejoindre la communauté BADAM ?
        </h4>
        <p>
          Apprenez, progressez, formez les autres. C'est le moment de vous lancer.
        </p>
      </div>
      {/* <button className="bg-cta-700 text-white py-3 px-6 rounded-lg hover:bg-cta-800 transition">
        Commencer maintenant
      </button> */}
      <Button to={"/register"}>Commencer</Button>
    </section>
  );
}
