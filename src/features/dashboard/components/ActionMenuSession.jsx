import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ActionMenuSession({
  sessionId,
  closeMenu,
  onRequestDelete,
}) {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/dashboard/sessions/${sessionId}/edit`);
    closeMenu();
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onRequestDelete(); 
  };

  return (
    <div>
      <div className="bg-background-50 border rounded-md shadow-md w-56 p-2 space-y-1 ">
        <button
          onClick={handleEdit}
          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-background-100 rounded text-sm text-left"
        >
          <Pencil className="w-4 h-4 text-cta-500" />
          Modifier la session
        </button>
        <button
          onClick={handleDeleteClick}
          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-background-100 rounded text-sm text-left"
        >
          <Trash2 className="w-4 h-4 text-error-500" /> Supprimer la session
        </button>
      </div>
    </div>
  );
}
