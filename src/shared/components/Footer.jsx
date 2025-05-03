import React from "react";

export default function Footer({ isMobile = false, isMinimal = false }) {
  const layoutClass = isMobile
    ? "flex-col items-center"
    : "flex-row justify-center items-center";
  const contentVisible = !isMinimal;

  return (
    <footer className="bg-text-900 text-disabled-50 px-[24px] py-[28px] w-375 h-full">
      {contentVisible && (
        <div className={`flex ${layoutClass} flex-wrap gap-y-3.5 text-center`}>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">
              Apprendre, progresser et partager sans limite.
            </p>
            <p className="text-xs opacity-70">© 2025 BADAM — tous droits réservés</p>
            <p className="text-xs opacity-70">Conditions d'utilisation</p>
            <p className="text-xs opacity-70">Formations</p>
            <p className="text-xs opacity-70">À propos</p>
            <p className="text-xs opacity-70">FAQ</p>
            <p className="text-xs opacity-70">Mentions légales</p>
          </div>
        </div>
      )}
    </footer>
  );
}