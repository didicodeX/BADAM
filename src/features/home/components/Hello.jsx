import { useAuthStore } from "@/features/auth/store/auth.store";
import Content from "@/shared/components/Content";
import { formatName } from "@/shared/utils/formatName";
import { getInitials } from "@/shared/utils/getInitials";
import { Link } from "react-router-dom";

export default function Hello() {
  const { user } = useAuthStore();
  return (
    <Content>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
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
          <h2>
            Nous sommes ravis de vous retrouver,{" "}
            <span className="capitalize font-extrabold">{formatName(user.name)}</span>
          </h2>
          <h4>
            <Link className="hover:text-cta-500" to="/profile">
              Modifier vos informations personnelles
            </Link>
          </h4>
        </div>
      </div>
    </Content>
  );
}
