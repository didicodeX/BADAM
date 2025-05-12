import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Bell, Plus } from "lucide-react";
import { getInitials } from "@/shared/utils/getInitials";
import UserMenu from "@/shared/components/UserMenu";
import Logo from "@/shared/components/Logo";

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
    <header className="fixed top-0 left-0 w-full flex items-center justify-between padd-x py-4 bg-background-50 z-50 shadow-sm h-16">
      {/* Logo */}
      <Logo/>

      <div className="flex gap-3 items-center relative" ref={menuRef}>
        <div
          className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center hover:cursor-pointer transition-all border border-cta-200 hover:border-cta-500"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
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

        {menuOpen && (
          <UserMenu user={user} onClose={() => setMenuOpen(false)} />
        )}
      </div>
    </header>
  );
}
