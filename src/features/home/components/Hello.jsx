import { useAuthStore } from "@/features/auth/store/auth.store";
import { Link } from "react-router-dom";

export default function Hello() {
  const { user } = useAuthStore();
  console.log(user);

  return (
    <div className="padd-x padd-t flex flex-col gap-2 lg:flex-row">
      <div className="w-[113px] ">
        <img src={user.avatar} className="rounded-full" alt="avatar" />
      </div>
      <div>
        <h1>Nous sommes ravis de vous retrouver, <span className="capitalize">{user.name}</span></h1>
        <h4>
          <Link className="hover:text-cta-500" to="/profile">Modifier vos informations professionnelles</Link>
        </h4>
      </div>
    </div>
  );
}
