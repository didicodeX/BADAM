import Avatar from "./Avatar";
import { formatName } from "@/shared/utils/formatName";

export default function ParticipantCard({ participant }) {
  return (
    <div className="flex flex-col items-center bg-background-50 border border-background-200 rounded-xl p-4 shadow-md w-full max-w-[180px]">
      <Avatar user={participant} size="lg" />
      <p className="text-sm font-semibold text-text-900 mt-2 text-center truncate">
        {formatName(participant.name)}
      </p>
    </div>
  );
}
