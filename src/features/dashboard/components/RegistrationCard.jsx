import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { frCA } from "date-fns/locale";
import { LogOut } from "lucide-react";
import Status from "@/shared/components/Status";
import ConfirmDeleteModal from "@/shared/components/ConfirmDeleteModal";

export default function RegistrationCard({ id, trainingTitle, trainingImage, session, onUnfollow }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    navigate(`/sessions/${id}`);
  };

  const handleConfirm = () => {
    onUnfollow(id); // Appelle la fonction d'unfollow avec l'id
    setIsModalOpen(false);
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
            setIsModalOpen(true); // 👈 ouvre la modale locale
          }}
          className="cursor-pointer p-1 rounded-full transition pt-1"
        >
          <LogOut className="w-5 h-5 text-error-500 hover:text-error-700" />
        </button>
      </div>

      {/* 👇 Modale déplacée ici */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Se désinscrire de la séssion"
        message="Tu es sur le point de te désinscrire. Cette action est irréversible. Veux-tu continuer ?"
        confirmText="Se désinscrire"
      />
    </div>
  );
}
