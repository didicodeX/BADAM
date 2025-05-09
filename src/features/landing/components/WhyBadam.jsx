import { Users, MapPin, Flame, MicVocal } from "lucide-react";

const valeurs = [
  {
    icon: <Users className="text-cta-500 w-fit h-full" />,
    titre: "Apprentissage en petit groupe",
    texte: "Des sessions conviviales, interactives, pour progresser à votre rythme avec l’aide d’un formateur dédié.",
  },
  {
    icon: <Flame className="text-cta-500 w-fit h-full" />,
    titre: "Formateurs passionnés",
    texte: "Tous les intervenants sont des passionnés, pas juste des profs. Ils partagent leur expérience, pas des PowerPoint.",
  },
  {
    icon: <MapPin className="text-cta-500 w-fit h-full" />,
    titre: "Sessions 100% en présentiel",
    texte: "BADAM favorise les vraies interactions humaines. Apprenez en face à face, dans votre ville.",
  },
  {
    icon: <MicVocal className="text-cta-500 w-fit h-full" />,
    titre: "Devenez formateur vous aussi",
    texte: "Après avoir suivi des sessions, vous pouvez créer votre propre formation. Apprendre & transmettre vont ensemble.",
  },
];

export default function WhyBadam() {
  return (
    <section className=" py-6 gap-6">
      <h3 className="text-3xl font-bold text-center text-text-900 mb-6">
        Pourquoi BADAM ? (section valeurs)
      </h3>
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {valeurs.map((valeur, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div>{valeur.icon}</div>
            <div>
              <h4 className="text-2xl font-bold text-text-900">{valeur.titre}</h4>
              <p className="text-text-900 text-sm">{valeur.texte}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
