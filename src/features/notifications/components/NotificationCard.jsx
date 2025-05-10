import Button from "@/shared/components/Button";
import { useNavigate } from "react-router-dom";

export default function NotificationCard({ notif, onRead, onDelete }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (notif.link) {
      onRead(notif._id); // marquer comme lu
      navigate(notif.link); // rediriger
    }
  };

  return (
    <div
      className={`border p-4 rounded-md bg-white shadow-sm cursor-pointer hover:bg-gray-50 flex flex-col justify-between  ${
        notif.read ? "text-gray-500" : "text-black font-bold"
      }`}
      onClick={handleClick}
    >
      <div>
        <p>{notif.message}</p>
        <small className="text-xs text-gray-400">
          {new Date(notif.createdAt).toLocaleString()}
        </small>
      </div>

      <div className="flex gap-2">
        {!notif.read && (
          <Button size="sm" variant="ghost" onClick={(e) => {
            e.stopPropagation();
            onRead(notif._id);
          }}>
            Marquer comme lu
          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={(e) => {
          e.stopPropagation();
          onDelete(notif._id);
        }}>
          Supprimer
        </Button>
      </div>
    </div>
  );
}
