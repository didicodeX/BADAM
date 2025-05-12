import Content from "@/shared/components/Content";
import Section from "@/shared/components/Section";

const testimonials = [
  {
    name: "Fatima",
    text: "Un format court, vivant et hyper motivant. J’ai adoré !",
  },
  {
    name: "Jean",
    text: "BADAM m’a permis de transmettre ma passion en toute simplicité.",
  },
  { name: "Luc", text: "Je suis venu apprendre, et j’ai fini par enseigner." },
  {
    name: "Sophie",
    text: "Petit groupe, grande progression. L’ambiance change tout.",
  },
];

export default function TestimonialsSection() {
  return (
    <Content public>
      <Section>
        <h4 className="text-center">Que disent nos utilisateurs ?</h4>
        <div className="grid md:grid-cols-2 gap-6 py-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-background-100 rounded-lg  p-6 text-center space-y-4"
            >
              <p className="text-text-800 italic">"{t.text}"</p>
              <p className="font-semibold text-cta-500">{t.name}</p>
            </div>
          ))}
        </div>
      </Section>
    </Content>
  );
}
