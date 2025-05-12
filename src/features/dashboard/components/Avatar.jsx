import { getInitials } from "@/shared/utils/getInitials";
import classNames from "classnames";

export default function Avatar({ user, size = "md" }) {
  const sizeMap = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-14 h-14 text-lg",
    xl: "w-20 h-20 text-xl",
  };

  return (
    <div
      className={classNames(
        "rounded-full overflow-hidden flex items-center justify-center border border-cta-200",
        sizeMap[size]
      )}
    >
      {user.avatar ? (
        <img
          src={user.avatar}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className={classNames(
            "rounded-full bg-cta-100 text-cta-700 flex items-center justify-center w-full h-full",
            sizeMap[size]
          )}
        >
          {getInitials(user.name)}
        </div>
      )}
    </div>
  );
}
