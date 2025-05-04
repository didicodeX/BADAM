import { useAuthStore } from "@/features/auth/store/auth.store";
import { getInitials } from "@/shared/utils/getInitials";
import { Link } from "react-router-dom";

export default function Hello() {
  const { user } = useAuthStore();
  console.log(user);
  return (
    <div className="padd-x padd-t flex flex-col gap-6 xl:flex-row xl:items-center">
      <div className="w-28 h-28">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-cta-100 text-cta-700 flex items-center justify-center">
            <h1>{getInitials(user.name)}</h1>
          </div>
        )}
      </div>
      <div>
        <h1>
          Nous sommes ravis de vous retrouver,{" "}
          <span className="capitalize">{user.name}</span>
        </h1>
        <h4>
          <Link className="hover:text-cta-500" to="/profile">
            Modifier vos informations professionnelles
          </Link>
        </h4>
      </div>
    </div>
  );
}
