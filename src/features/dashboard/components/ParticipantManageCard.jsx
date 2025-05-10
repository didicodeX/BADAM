import Button from "@/shared/components/Button";
import Avatar from "./Avatar";

export default function ParticipantManageCard({ participant, onRemove }) {
  return (
    <div className="border p-4 rounded-md flex flex-col items-center gap-2 bg-white shadow-sm min-w-[150px]">
      <Avatar user={participant}/>
      <p className="text-sm font-semibold text-center">{participant.name}</p>
      <Button size="sm" variant="danger" onClick={onRemove}>
        Supprimer
      </Button>
    </div>
  );
}
