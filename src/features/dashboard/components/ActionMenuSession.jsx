import { Pencil, Trash, UsersRound, MessagesSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ActionMenuSession({
  sessionId,
  closeMenu,
  onRequestDelete,
}) {
  const navigate = useNavigate();

  const goTo = (path) => (e) => {
    e.stopPropagation();
    navigate(`/dashboard/sessions/${sessionId}/${path}`);
    closeMenu();
  };

  const handleEdit = goTo("edit");
  const handleParticipants = goTo("participants");
  const handleReviews = goTo("reviews");

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onRequestDelete();
  };

  return (
    <div className="bg-background-50 border rounded-md shadow-md w-56 p-2 space-y-1">
      <button
        onClick={handleEdit}
        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-background-100 rounded text-sm text-left"
      >
        <Pencil className="w-4 h-4 text-cta-500" />
        Modifier la session
      </button>

      <button
        onClick={handleParticipants}
        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-background-100 rounded text-sm text-left"
      >
        <UsersRound className="w-4 h-4 text-cta-500" />
        Participants
      </button>

      <button
        onClick={handleReviews}
        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-background-100 rounded text-sm text-left"
      >
        <MessagesSquare className="w-4 h-4 text-cta-500" />
        Avis
      </button>

      <button
        onClick={handleDeleteClick}
        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-background-100 rounded text-sm text-left"
      >
        <Trash className="w-4 h-4 text-error-500" />
        Supprimer la session
      </button>
    </div>
  );
}
