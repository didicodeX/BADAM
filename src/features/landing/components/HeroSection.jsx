import Button from "@/shared/components/Button";

const imageList = [
  "/img/Ceramic.jpg",
  "/img/engine-oil.jpg",
  "/img/Jewelry-making.jpg",
  "/img/couture.jpg",
  "/img/tricot.jpg",
  "/img/Clothing customization.jpg",
];

export default function HeroSection() {
  return (
    <section className="w-full flex flex-col-reverse lg:flex-row  padd-x py-10 gap-10">
      <div className="flex-1 flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-text-900">
          Trouvez votre prochaine session de formation.
        </h1>
        <h4 className="text-lg text-text-700">
          Des ateliers concrets et des sessions 100% en présentiel pour apprendre, partager et progresser ensemble.
        </h4>
        <Button to="/register">Commencer</Button>
      </div>

      <div className="flex-1 grid lg:grid-cols-2 md:grid-cols-3 grid-cols-2 gap-3 justify-start">
        {imageList.map((src, i) => (
          <div key={i} className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={src}
              alt={`image-${i}`}
              className="w-full h-[140px] object-cover hover:scale-105 transition-transform"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
