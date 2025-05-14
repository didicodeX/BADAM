import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { frCA } from "date-fns/locale";
import { Heart, HeartPlus } from "lucide-react";
import Status from "@/shared/components/Status";
import { useSearchStore } from "@/features/search/store/search.store";

export default function FavoriteCard({
  id,
  trainingTitle,
  trainingImage,
  session,
  isFavorite,
  onToggleFavorite,
}) {
  const navigate = useNavigate();
  const { setQuery } = useSearchStore();

  const handleCardClick = () => {
    setQuery("");
    navigate(`/sessions/${id}`);
  };

  return (
    <div
      className="flex-grow flex-shrink min-w-[300px] basis-[300px] max-w-[400px] w-full flex flex-col cursor-pointer"
      onClick={handleCardClick}
    >
      {trainingImage && (
        <img
          src={trainingImage}
          alt={trainingTitle}
          className="h-[147px] object-cover rounded-lg"
        />
      )}
      <div className="flex justify-between gap-2 items-start">
        <div className="flex flex-col">
          <h5 className="line-clamp-1 font-bold">{trainingTitle}</h5>
          <small>{session.address}</small>
          <sub>
            Du{" "}
            {format(new Date(session.startDateTime), "d MMMM yyyy 'à' p", {
              locale: frCA,
            })}{" "}
            au{" "}
            {format(new Date(session.endDateTime), "d MMMM yyyy 'à' p", {
              locale: frCA,
            })}
          </sub>
          <Status
            taken={session.currentNbParticipants}
            total={session.maxParticipants}
            expired={new Date(session.endDateTime) < new Date()}
          />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="cursor-pointer transition-colors hover:text-cta-500 text-text-900 pt-1"
        >
          {isFavorite ? (
            <Heart className="w-5 h-5 text-cta-500 fill-current" />
          ) : (
            <HeartPlus className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
