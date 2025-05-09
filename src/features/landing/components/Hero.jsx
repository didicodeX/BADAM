import React from "react";

const Hero = () => {
  return (
    <div className="w-full h-fit px-24 py-6 flex flex-col md:flex-row items-center gap-auto">
      {/* Text Section */}
      <div className="flex-1 flex flex-col items-start gap-6">
        <h1 className="text-5xl md:text-5xl font-bold text-text-900">
          Trouvez votre prochaine session de formation.
        </h1>
        <p className="text-3xl text-text-900">
          Des ateliers pratiques et sessions en présentiel pour progresser dans votre domaine.
        </p>
        <button className="bg-cta-700 text-white py-3 px-6 rounded-lg hover:bg-[#a33200] transition drop-shadow flex items-center gap-2">
            Commencer
        </button>

      </div>

      {/* Image Section */}
      <div className="flex-1 ">
        <img
          src="https://www.equipage-formation.fr/wp-content/uploads/2020/02/Formation-communication-interpersonnelle-1024x683.jpg"
          alt="Hero"
          className="w-full h-[545px] object-cover "
        />
      </div>
    </div>
  );
};

export default Hero;
