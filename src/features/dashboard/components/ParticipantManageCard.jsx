import Avatar from "./Avatar";
import { Trash } from "lucide-react";

export default function ParticipantManageCard({ participant, onRemove }) {
  return (
    <div className="bg-background-50 border border-background-200 rounded-xl shadow-sm p-4 flex flex-col items-center gap-2 w-full max-w-[180px] transition hover:shadow-md">
      <Avatar user={participant} size="lg" />
      <p className="text-sm font-semibold text-center truncate">{participant.name}</p>
      <button
        onClick={onRemove}
        className="text-sm flex items-center gap-1 mt-2 text-error-500 hover:text-error-700"
      >
        <Trash className="w-4 h-4 " />
        Supprimer
      </button>
    </div>
  );
}
