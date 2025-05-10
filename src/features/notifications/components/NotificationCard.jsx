import { Star, Trash, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

export default function NotificationCard({ notif, onRead, onDelete }) {
  const navigate = useNavigate();
  const isUnread = !notif.read;

  const handleClick = () => {
    if (notif.link) {
      onRead(notif._id);
      navigate(notif.link);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={classNames(
        "p-4 rounded-xl max-w-4xl shadow-sm bg-white transition cursor-pointer hover:bg-cta-50 border-l-4",
        isUnread ? "border-cta-500" : "border-transparent"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icône principale */}
        <div className="bg-cta-100 text-cta-500 rounded-full p-2">
          <Star className="w-5 h-5" />
        </div>

        {/* Contenu principal */}
        <div className="flex-1">
          <p className={classNames("text-sm", isUnread && "font-semibold")}>
            {notif.message}
          </p>
          <p className="text-xs text-text-400 mt-1">
            {new Date(notif.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Actions avec icônes */}
        <div className="flex flex-col items-end gap-2">
          {isUnread && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRead(notif._id);
              }}
              className="text-cta-500 hover:text-cta-700"
              title="Marquer comme lu"
            >
              <CheckCircle className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(notif._id);
            }}
            className="text-error-500 hover:text-error-700"
            title="Supprimer"
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
