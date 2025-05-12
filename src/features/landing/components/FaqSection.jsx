import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Section from "@/shared/components/Section";
import Content from "@/shared/components/Content";

const faq = [
  [
    "Qu'est-ce que BADAM ?",
    "Une plateforme pour apprendre et transmettre en présentiel.",
  ],
  [
    "Que puis-je apprendre avec BADAM ?",
    "Vous pouvez apprendre des compétences concrètes et utiles dans la vie de tous les jours : tricoter, faire son changement d'huile, fabriquer des bijoux, cuisiner des plats maison… Ce sont des savoirs transmis par passion, pas par diplôme.",
  ],
  [
    "Puis-je devenir formateur ?",
    "Bien sûr! Toute personne peut créer une session et partager ce qu'elle sait. Sur BADAM, nous croyons que chacun a quelque chose à transmettre.",
  ],
  [
    "Ai-je besoin d'un diplôme pour enseigner sur BADAM ?",
    "Pas du tout. Ce qui compte ici, c'est ce que vous savez faire, pas votre CV. BADAM valorise le partage de savoirs issus de l'expérience, de la passion et du quotidien.",
  ],
  [
    "Est-ce payant ?",
    "Certaines sessions sont gratuites, d'autres payantes selon le formateur.",
  ],
  [
    "Où ont lieu les sessions ?",
    "Elles se déroulent en présentiel, dans des lieux définis par les formateurs (cafés, salles, ateliers…).",
  ],
  [
    "Puis-je participer avec des amis ?",
    "Absolument. Certaines sessions sont même faites pour ça !",
  ],
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <Content public>
      <Section last>
        <h4 className="text-center">Questions fréquemment posées</h4>
        <div>
          {faq.map(([question, answer], index) => (
            <div
              key={index}
              className=" border-background-200 overflow-hidden transition-all border-b"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full py-4 flex justify-between items-center text-left"
              >
                <span className="font-semibold text-text-900">{question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-text-500 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className=" pb-4 text-sm text-text-700">{answer}</div>
              )}
            </div>
          ))}
        </div>
      </Section>
    </Content>
  );
}
