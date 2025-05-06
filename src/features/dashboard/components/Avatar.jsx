import { getInitials } from "@/shared/utils/getInitials";

export default function Avatar({ user }) {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border border-cta-200">
      {user.avatar ? (
        <img
          src={user.avatar}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-cta-100 text-cta-700 flex items-center justify-center ">
          {getInitials(user.name)}
        </div>
      )}
    </div>
  );
}
