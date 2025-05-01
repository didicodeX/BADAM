import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Bell, Plus } from "lucide-react";
import { getInitials } from "../utils/getInitials";
import UserMenu from "./UserMenu"; // 🔁 Reuse same dropdown component as Navbar

export default function DashboardNavbar() {
  const { user } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Gestion fermeture automatique du menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-background-50 px-6 py-4 h-14 shadow-sm flex items-center justify-between z-50">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link to="/">
          BA<span className="text-cta-500">DAM</span>
        </Link>
      </div>

      <div className="flex gap-3 items-center relative" ref={menuRef}>
      <Link
          to="/dashboard/create"
          className="flex items-center gap-1 text-sm px-4  py-2 bg-cta-700 text-white w-fit rounded-md"
        >
          <Plus className="w-4 h-4" />
          Créer
        </Link>

        <Link 
          to="/notifications"
          className="flex items-center justify-center hover:text-cta-500"
        >
          <Bell className="w-5 h-5"/>
        </Link>

        <div
          className="w-10 h-10 rounded-full bg-cta-200 flex items-center justify-center hover:cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {getInitials(user.name)}
        </div>

        {menuOpen && <UserMenu user={user} onClose={() => setMenuOpen(false)} />}
      </div>
    </header>
  );
}
