import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { formatName } from "@/shared/utils/formatName";

export default function ParticipantsList({ participants, session }) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {participants.slice(0, 5).map((p) => (
        <div
          key={p._id}
          className="flex flex-col items-center w-52 bg-background-100 p-6 rounded-lg"
        >
          <Avatar user={p} />
          <p className="font-medium text-cta-500">{formatName(p.name)}</p>
        </div>
      ))}
      {participants.length > 5 && (
        <Link className="w-14 h-14 rounded-full bg-background-100 flex items-center justify-center text-sm text-cta-500"
        to={`/dashboard/sessions/${session._id}/participants`}
        >
          +{participants.length - 5}
        </Link>
      )}
    </div>
  );
}
