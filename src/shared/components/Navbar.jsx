import { Link } from "react-router-dom";
import { Heart, Bell } from "lucide-react";

import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { getInitials } from "../utils/getInitials";
import SearchInput from "./SearchInput";
import UserMenu from "./UserMenu"; // 👈 Crée ce fichier séparément
import { baseStyle, solidStyle, outlineStyle } from "../lib/buttonStyle";

export default function Navbar() {
  const { user } = useAuthStore();
  const [autoFocus, setAutoFocus] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const shouldFocus =
      window.location.pathname === "/search" &&
      sessionStorage.getItem("badam:search:autoFocus") === "1";

    if (shouldFocus) {
      setAutoFocus(true);
      sessionStorage.removeItem("badam:search:autoFocus");
    }
  }, []);

  // Fermer le menu si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-4 bg-background-50 z-50 shadow-sm h-16">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link to="/">
          BA<span className="text-cta-500">DAM</span>
        </Link>
      </div>

      {/* Barre de recherche */}
      <div className="flex-1 mx-8 max-w-xl">
        <SearchInput autoFocus={autoFocus} />
      </div>

      {/* Actions */}
      <div className="relative flex gap-3 items-center" ref={menuRef}>
        {user ? (
          <>
            <Link
              to="/dashboard/favorites"
              className="flex items-center hover:text-cta-500 rounded"
            >
              <Heart className="w-5 h-5" />
            </Link>
            <Link
              to="/notifications"
              className="flex items-center hover:text-cta-500 rounded"
            >
              <Bell className="w-5 h-5" />
            </Link>
            <div
              className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center hover:cursor-pointer transition-all border border-cta-200 hover:border-cta-500"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
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

            {userMenuOpen && (
              <UserMenu user={user} onClose={() => setUserMenuOpen(false)} />
            )}
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={`${baseStyle} ${outlineStyle} text-sm`}
            >
              Se connecter
            </Link>
            <Link to="/login" className={`${baseStyle} ${solidStyle} text-sm`}>
              S'inscrire
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
