import { useState, useEffect } from "react";
import {
  Menu,
  Search,
  X,
  User,
  LayoutDashboard,
  Heart,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useAuth } from "@/features/auth/hooks/useAuth";
import useNotifications from "@/features/notifications/hooks/useNotifications";
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import { formatName } from "../utils/formatName";
import Avatar from "@/features/dashboard/components/Avatar";

export default function NavbarMobile({
  menuOpen,
  setMenuOpen,
  forceOpenSearchOnMount = false,
}) {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { hasUnreadNotifications } = useNotifications();
  const [searchOpen, setSearchOpen] = useState(forceOpenSearchOnMount);

  useEffect(() => {
    if (forceOpenSearchOnMount) {
      sessionStorage.removeItem("badam:search:autoFocus");
    }
  }, [forceOpenSearchOnMount]);

  const goToProfile = () => {
    navigate("/profile");
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-background padd-x py-3 shadow-sm z-50 h-14 bg-background-50">
      {!searchOpen ? (
        <div className="flex items-center justify-between">
          {menuOpen ? (
            <X
              className="w-6 h-6 text-primary cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <Menu
              className="w-6 h-6 text-primary cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}

          <Logo />

          <Search
            className="w-6 h-6 text-primary cursor-pointer"
            onClick={() => setSearchOpen(true)}
          />
        </div>
      ) : (
        <SearchInput
          mobile
          autoFocus={true}
          onClose={() => setSearchOpen(false)}
        />
      )}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute top-full left-0 min-w-2/3 h-[calc(100vh-56px)] bg-background-50 border-t py-3 px-6 z-40 flex flex-col justify-between border-r border-r-text-100"
          >
            <div className="flex flex-col gap-y-6">
              {user && (
                <div
                  className="flex items-center gap-3 mb-6"
                  onClick={goToProfile}
                >
                  <Avatar user={user}/>
                  <div>
                    <p className="font-semibold">
                      {formatName(user.name)}
                    </p>
                    <p className="text-sm text-text-400">{user.email}</p>
                  </div>
                </div>
              )}

              <nav className="space-y-4">
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 hover:text-cta-500"
                >
                  <User className="w-5 h-5" /> Profil
                </Link>
                <Link
                  to="/dashboard/home"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 hover:text-cta-500"
                >
                  <LayoutDashboard className="w-5 h-5" /> Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/dashboard/sessions", {
                      state: { tab: "favorites" },
                    });
                  }}
                  className="flex items-center gap-2 hover:text-cta-500 w-full"
                >
                  <Heart className="w-4 h-4" /> Mes favoris
                </button>
                <Link
                  to="/notifications"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 hover:text-cta-500"
                >
                  <div className="relative">
                    <Bell className="w-5 h-5" />
                    {hasUnreadNotifications && (
                      <span className="absolute top-0 right-0 w-2 h-2 bg-cta-500 rounded-full" />
                    )}
                  </div>
                  Notifications
                </Link>
                <Link
                  to="/coming-soon"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 hover:text-cta-500"
                >
                  <Settings className="w-5 h-5" /> Paramètres
                </Link>
                <hr className="my-4" />
                <Link
                  to="/coming-soon"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 hover:text-cta-500"
                >
                  <HelpCircle className="w-5 h-5" /> Aide
                </Link>
              </nav>
            </div>

            <div>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-error-500 hover:text-error-700"
              >
                <LogOut className="w-5 h-5" /> Se déconnecter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
