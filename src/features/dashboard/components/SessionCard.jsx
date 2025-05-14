import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { frCA } from "date-fns/locale";
import Status from "../../../shared/components/Status";
import ConfirmDeleteModal from "@/shared/components/ConfirmDeleteModal";
import ActionMenuSession from "./ActionMenuSession";
import { useSession } from "../hooks/useSessions";

export default function SessionCard({
  id,
  trainingTitle,
  trainingImage,
  session,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const { deleteSession } = useSession();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCardClick = () => {
    navigate(`/dashboard/sessions/${id}`);
  };

  const openDeleteModal = () => {
    setShowConfirmDelete(true);
    setMenuOpen(false); // facultatif, pour fermer le menu si tu veux
  };

  const handleConfirmDelete = () => {
    deleteSession(id);
    setShowConfirmDelete(false);
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
      <div className="flex justify-between gap-2">
        <div className="flex flex-col">
          <h4 className="line-clamp-1">{trainingTitle}</h4>
          <small>{session.address}</small>
          <sub>
            Du{" "}
            {format(new Date(session.startDateTime), "EEEE MMMM yyyy 'à' p", {
              locale: frCA,
            })}{" "}
            au{" "}
            {format(new Date(session.endDateTime), "EEEE MMMM yyyy 'à' p", {
              locale: frCA,
            })}
          </sub>
          <Status
            taken={session.currentNbParticipants}
            total={session.maxParticipants}
            expired={new Date(session.endDateTime) < new Date()}
          />
        </div>
        <div className="relative" ref={menuRef}>
          <div className="cursor-pointer hover:bg-cta-100/80 p-1 rounded-full transition">
            <MoreHorizontal
              className="w-5 h-5"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((prev) => !prev);
              }}
            />
          </div>

          {menuOpen && (
            <div className="absolute right-0 z-10">
              <ActionMenuSession
                sessionId={id}
                closeMenu={() => setMenuOpen(false)}
                onRequestDelete={openDeleteModal}
              />
            </div>
          )}
        </div>
      </div>
      {/* La modale est rendue ici, donc plus de problème de fermeture ! */}
      <ConfirmDeleteModal
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer cette session"
        message="Cette action est irréversible. Es-tu sûr de vouloir supprimer cette session ?"
        confirmText="Supprimer"
      />
    </div>
  );
}
