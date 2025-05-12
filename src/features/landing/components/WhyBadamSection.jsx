import { Users, MapPin, Flame, MicVocal,Wrench  } from "lucide-react";
import Section from "@/shared/components/Section";
import Content from "@/shared/components/Content";

const values = [
  {
    icon: <Users className="text-cta-500 w-6 h-6" />,
    title: "Apprentissage en petit groupe",
    desc: "Des sessions conviviales et interactives pour apprendre à votre rythme.",
  },
  {
    icon: <Flame className="text-cta-500 w-6 h-6" />,
    title: "Formateurs passionnés",
    desc: "Nos formateurs ne sont pas que des experts, ce sont des passionnés qui aiment transmettre.",
  },
  {
    icon: <MapPin className="text-cta-500 w-6 h-6" />,
    title: "100% en présentiel",
    desc: "Pas de visio ! Apprenez dans un vrai cadre humain et motivant.",
  },
  {
    icon: <MicVocal className="text-cta-500 w-6 h-6" />,
    title: "Devenez formateur vous aussi",
    desc: "Tout le monde peut partager ce qu’il sait. Il n’y a pas de hiérarchie, juste l’envie de transmettre.",
  },
  {
    icon: <Wrench className="text-cta-500 w-6 h-6" />,
    title: "Des savoirs du quotidien",
    desc: "Pas besoin de diplôme ou de titre : BADAM valorise les compétences que vous avez apprises dans la vraie vie. Ce sont des savoirs utiles, humains, qu’on ne vous enseigne pas à l’école.",
  },
];

export default function WhyBadamSection() {
  return (
    <Content public>
      <Section>
        <h4 className="text-center">
          Pourquoi BADAM ?
        </h4>
        <div className="grid md:grid-cols-2 gap-10 py-4">
          {values.map((val, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="text-3xl">{val.icon}</div>
              <div>
                <h3 className="font-semibold text-lg text-text-900">
                  {val.title}
                </h3>
                <p className="text-sm text-text-700">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Content>
  );
}
