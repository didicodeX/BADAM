import { Plus, Pencil, Trash, MessagesSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ActionMenuTraining({
  formationId,
  closeMenu,
  onRequestDelete,
}) {
  const navigate = useNavigate();

  const goTo = (path) => (e) => {
    e.stopPropagation();
    navigate(`/dashboard/trainings/${formationId}/${path}`);
    closeMenu();
  };

  const handleCreateSession = goTo("create");

  const handleEdit = goTo("edit");

  const handleReviews = goTo("reviews");

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onRequestDelete();
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
      <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-background-100 rounded text-sm text-left" onClick={handleReviews}>
        <MessagesSquare className="w-4 h-4 text-cta-500" />
        Avis
      </button>
      <button
        onClick={handleDeleteClick}
        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-background-100 rounded text-sm text-left"
      >
        <Trash className="w-4 h-4 text-cta-500" />
        Supprimer la formation
      </button>
    </div>
  );
}
