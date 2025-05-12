// features/search/components/SearchOverlay.jsx

import { useEffect, useRef } from "react";
import SessionCard from "@/features/dashboard/components/SessionCard";
import FavoriteCard from "@/features/home/components/FavoriteCard";
import { useAuthStore } from "@/features/auth/store/auth.store";
import useHome from "@/features/home/hooks/useHome";

export default function SearchOverlay({ results, query, onClose }) {
  const overlayRef = useRef(null);
  const { user } = useAuthStore();
  const { handleToggleFavorite } = useHome();
  const favorites = user?.favorites || [];

  // Fermer si clic à l’extérieur ou touche Échap
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-background-50/90 backdrop-blur-md overflow-y-auto px-4 py-6"
      style={{ paddingBottom: "6rem" }} // espace bas si besoin
    >
      <div
        ref={overlayRef}
        className="max-w-5xl mx-auto space-y-4"
      >
        {/* En-tête des résultats */}
        {query && (
          <div className="border-b border-text-100 pb-4 mb-4">
            {results.length > 0 ? (
              <p className="text-text-700 text-sm font-medium">
                {results.length} session{results.length > 1 ? "s" : ""} trouvée{results.length > 1 ? "s" : ""} pour <span className="font-semibold">"{query}"</span>
              </p>
            ) : (
              <p className="text-error-500 text-sm font-medium">
                Aucune session trouvée pour <span className="font-semibold">"{query}"</span>
              </p>
            )}
          </div>
        )}

        {/* Liste des résultats */}
        {results.map((session) => {
          const isOwner = session.createdBy === user?._id;
          return isOwner ? (
            <SessionCard
              key={session._id}
              id={session._id}
              trainingTitle={session.training.title}
              trainingImage={session.coverImage || session.training.images[0]}
              session={session}
            />
          ) : (
            <FavoriteCard
              key={session._id}
              id={session._id}
              trainingTitle={session.training.title}
              trainingImage={session.coverImage || session.training.images[0]}
              session={session}
              isFavorite={favorites.includes(session._id)}
              onToggleFavorite={() => handleToggleFavorite(session._id)}
            />
          );
        })}
      </div>
    </div>
  );
}
