import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { LogOut } from "lucide-react";
import Status from "@/shared/components/Status";

export default function RegistrationCard({ id, trainingTitle, trainingImage, session, onUnfollow }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
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
          <h4 className="line-clamp-1">{trainingTitle}</h4>
          <small>{session.address || "Adresse inconnue"}</small>
          <sub>
            {session.startDateTime && session.endDateTime ? (
              <>
                {format(new Date(session.startDateTime), "MMMM d", { locale: enUS })}{" "}
                to{" "}
                {format(new Date(session.endDateTime), "MMMM d", { locale: enUS })},{" "}
                {format(new Date(session.startDateTime), "p", { locale: enUS })} to{" "}
                {format(new Date(session.endDateTime), "p", { locale: enUS })} ADT
              </>
            ) : (
              "Date inconnue"
            )}
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
            onUnfollow();
          }}
          className="cursor-pointerp-1 rounded-full transition pt-1"
        >
          <LogOut className="w-5 h-5 text-error-500 hover:text-error-700" />
        </button>
      </div>
    </div>
  );
}
