import { ChevronDown } from "lucide-react";
import { useState } from "react";

const questions = [
  { question: "Qu'est ce que BADAM ?", reponse: "BADAM est une plateforme de formation en présentiel animée par des passionnés." },
  { question: "Que puis-je apprendre avec BADAM ?", reponse: "Vous pouvez apprendre des compétences humaines, créatives ou professionnelles, en groupe." },
  { question: "Puis-je enseigner sur BADAM ?", reponse: "Oui, après avoir suivi une session, vous pouvez aussi proposer votre propre session." },
  { question: "Faut-il payer pour suivre une session ?", reponse: "Oui, certaines sessions peuvent être payantes, d'autres gratuites." },
  { question: "Où ont lieu les sessions ?", reponse: "Elles ont lieu en présentiel, dans différentes villes au Canada." },
  { question: "Puis-je suivre une session avec des amis ?", reponse: "Absolument, vous pouvez vous inscrire en groupe !" },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className=" py-6 px-[96px] gap-6">
      <h3 className="text-3xl md:text-3xl font-bold text-center text-text-900 mb-10">
        Questions fréquemment posées
      </h3>
      <div className="max-w-4xl mx-auto space-y-4  px-[90px] py-[42px] gap-6">
        {questions.map((item, index) => (
          <div key={index} className="border-b border-background-200">
            <button
              className="w-full flex justify-between items-center py-4 text-left"
              onClick={() => toggle(index)}
            >
              <span className="font-semibold text-text-900">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-text-900 transition-transform duration-200 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {activeIndex === index && (
              <p className="text-text-900 pb-4 text-sm">{item.reponse}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
