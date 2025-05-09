import React from "react";

const Avis = () => {
  return (
    <div className="w-full h-fit px-24 py-6 flex flex-col gap-6">      

      {/* Testimonials Section */}
      <div className="w-full flex flex-col items-center">
        <h3 className="text-3xl font-bold text-text-900 mb-6">Que dise les utilisateurs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1088px]">
          {[
            {
              name: "Fatima",
              text: "J’ai adoré le format court et intensif. J’ai vraiment appris plus vite que je ne le pensais !",
              img: "https://img.freepik.com/vecteurs-premium/superbe-avatar-femme-brune-beret-rouge-portrait-jeune-fille-dans-style-plat-minimaliste_662937-105.jpg",
            },
            {
              name: "Jean",
              text: "BADAM m’a permis de partager ma passion et de former sans prise de tête.",
              img: "https://png.pngtree.com/png-vector/20230903/ourmid/pngtree-man-avatar-isolated-png-image_9935806.png",
            },
            {
              name: "Luc",
              text: "J’ai rejoint une session par curiosité, aujourd’hui je veux moi-même transmettre.",
              img: "https://thumbs.dreamstime.com/b/avatar-d-homme-de-connaisseur-104871313.jpg",
            },
            {
              name: "Sophie",
              text: "L’ambiance en petit groupe est juste top. On progresse ensemble, pas tout seul.",
              img: "https://img.freepik.com/vecteurs-premium/femme-avatar-lunettes_8462-2.jpg",
            },
          ].map((user, index) => (
            <div
              key={index}
              className="bg-background-100 py-6 px-5 gap-y-6 rounded-lg text-center flex flex-col items-center"
            >
              <p className="text-text-900 mb-6">{user.text}</p>
              <img
                src={user.img}
                alt={user.name}
                className="w-[80px] h-[80px] rounded-full object-cover mb-2"
              />
              <span className="text-cta-500 font-semibold">{user.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Avis;
