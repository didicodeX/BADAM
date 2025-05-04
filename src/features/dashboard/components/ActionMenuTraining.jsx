import { useState } from "react";
import { Plus, Pencil, Trash } from "lucide-react";
import { useTraining } from "../hooks/useTrainings";
import ConfirmDeleteModal from "@/shared/components/ConfirmDeleteModal";
import { useNavigate } from "react-router-dom";

export default function ActionMenuTraining({ formationId, closeMenu }) {
  const navigate = useNavigate();
  const { deleteTraining } = useTraining();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCreateSession = () => {
    navigate(`/dashboard/trainings/${formationId}/sessions/create`);
    closeMenu();
  };

  const handleEdit = () => {
    navigate(`/dashboard/trainings/${formationId}/edit`);
    closeMenu();
  };

  const handleDelete = () => {
    deleteTraining(formationId);
    setShowConfirm(false);
    closeMenu();
  };

  return (
    <div className="bg-background-50 border rounded-md shadow-md w-56 p-2 space-y-1">
      <button
        onClick={handleCreateSession}
        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-background-100 rounded text-sm text-left"
      >
        <Plus className="w-4 h-4 text-cta-500" />
        Créer une session
      </button>
      <button
        onClick={handleEdit}
        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-background-100 rounded text-sm text-left"
      >
        <Pencil className="w-4 h-4 text-cta-500" />
        Modifier la formation
      </button>
      <button
        onClick={() => setShowConfirm(true)}
        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-background-100 rounded text-sm text-left"
      >
        <Trash className="w-4 h-4 text-cta-500" />
        Supprimer la formation
      </button>
      <ConfirmDeleteModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Supprimer cette formation"
        message="Cette action est irréversible. Es-tu sûr de vouloir supprimer cette formation ?"
        confirmText="Supprimer"
      />
    </div>
  );
}
