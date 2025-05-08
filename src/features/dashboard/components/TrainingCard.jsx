import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import ActionMenuTraining from "./ActionMenuTraining";
import ConfirmDeleteModal from "@/shared/components/ConfirmDeleteModal";
import { useTraining } from "../hooks/useTrainings";

export default function TrainingCard({ id, title, description, imageUrl }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { deleteTraining } = useTraining();

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
    navigate(`/dashboard/trainings/${id}`);
  };

  const openDeleteModal = () => {
    setShowConfirmDelete(true);
    setMenuOpen(false); // facultatif, pour fermer le menu si tu veux
  };

  const handleConfirmDelete = () => {
    deleteTraining(id);
    setShowConfirmDelete(false);
  };

  return (
    <div
      className="flex-grow flex-shrink min-w-[300px] basis-[300px] max-w-[400px] w-full flex flex-col cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={imageUrl}
        alt={title}
        className="h-[147px] object-cover rounded-lg"
      />

      <div className="flex justify-between gap-2">
        <div className="flex flex-col">
          <h4 className="line-clamp-1">{title}</h4>
          <small className="line-clamp-3">{description}</small>
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
              <ActionMenuTraining
                formationId={id}
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
        title="Supprimer cette formation"
        message="Cette action est irréversible. Es-tu sûr de vouloir supprimer cette formation ?"
        confirmText="Supprimer"
      />
    </div>
  );
}
