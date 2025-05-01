import { Link } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth.store";
import SearchInput from "./SearchInput";
import { Bell, Heart, Plus } from "lucide-react";
import { getInitials } from "../utils/getInitials";

export default function DashboardNavbar() {
  const { user } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 w-full bg-background-50 px-6 py-4 h-14 shadow-sm flex items-center justify-between z-50">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link to="/">
          BA<span className="text-cta-500">DAM</span>
        </Link>
      </div>

      <div className="grid grid-cols-3 justify-center">
        <Link
          to="/dashboard/create"
          className="flex items-center w-full hover:text-cta-500 rounded gap-1"
        >
          <Plus/>
          creer
        </Link>
        <Link
          to="/notification"
          className="flex items-center justify-center w-full hover:text-cta-500 rounded"
        >
          <Bell />
        </Link>
        {/* Avatar utilisateur */}
        <div className="w-10 h-10 rounded-full bg-cta-200 flex items-center justify-center hover:cursor-pointer">
          {getInitials(user.name)}
        </div>
      </div>
    </header>
  );
}
