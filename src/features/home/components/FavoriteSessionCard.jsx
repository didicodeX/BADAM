import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Heart, HeartPlus } from "lucide-react";
import Status from "@/shared/components/Status";

export default function FavoriteSessionCard({
  id,
  trainingTitle,
  trainingImage,
  session,
  isFavorite,
  onToggleFavorite,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/sessions/${id}`); // ou `/dashboard/sessions/${id}` si c’est dans ton dashboard
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
          <h4 className="line-clamp-1">{trainingTitle}</h4>
          <small>{session.address}</small>
          <sub>
            {format(new Date(session.startDateTime), "MMMM d", {
              locale: enUS,
            })}{" "}
            to{" "}
            {format(new Date(session.endDateTime), "MMMM d", {
              locale: enUS,
            })}
            ,{" "}
            {format(new Date(session.startDateTime), "p", {
              locale: enUS,
            })}{" "}
            to{" "}
            {format(new Date(session.endDateTime), "p", {
              locale: enUS,
            })}{" "}
            ADT
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
          className="cursor-pointer hover:bg-cta-100/80 p-1 rounded-full transition"
        >
          {isFavorite ? (
            <Heart className="w-5 h-5 text-cta-500 fill-current" />
          ) : (
            <HeartPlus className="w-5 h-5 text-cta-500" />
          )}
        </button>
      </div>
    </div>
  );
}
