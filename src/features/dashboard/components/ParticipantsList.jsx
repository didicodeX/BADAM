import Avatar from "./Avatar";

export default function ParticipantsList({ participants }) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {participants.slice(0, 5).map((p) => (
        <div
          key={p._id}
          className="flex flex-col items-center w-52 bg-background-100 p-6 rounded-lg"
        >
          <Avatar user={p} />
          <p className="font-medium text-cta-500">{p.name}</p>
        </div>
      ))}
      {participants.length > 5 && (
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-sm">
          +{participants.length - 5}
        </div>
      )}
    </div>
  );
}
