import Avatar from "./Avatar";
import { formatName } from "@/shared/utils/formatName";

export default function ParticipantCard({ participant }) {
  return (
    <div
      className="flex flex-col flex-grow  items-center min-w-52 max-w-fit bg-background-100 p-6 rounded-lg"
    >
      <Avatar user={participant} />
      <p className="font-medium text-cta-500">{formatName(participant.name)}</p>
    </div>
  );
}
