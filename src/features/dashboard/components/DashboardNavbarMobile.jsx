import {
  Menu,
  X,
  User,
  LayoutDashboard,
  Heart,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth.store";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getInitials } from "@/shared/utils/getInitials";
import { capitalizeFirstLetter } from "@/shared/utils/capitalizeFirstLetter";
import useNotifications from "@/features/notifications/hooks/useNotifications";
import Logo from "@/shared/components/Logo";

export default function DashboardNavbarMobile({ menuOpen, setMenuOpen }) {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { hasUnreadNotifications } = useNotifications();
  const goToProfile = () => {
    navigate("/profile");
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-background px-4 py-3 shadow-sm z-50 h-16 bg-background-50">
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

        <Link
          to="/notifications"
          className="flex items-center hover:text-cta-500 rounded relative"
          onClick={() => setMenuOpen(false)}
        >
          <Bell className="w-6 h-6" />
          {hasUnreadNotifications && (
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-cta-500 rounded-full" />
          )}
        </Link>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute top-full left-0 w-2/3 h-[calc(100vh-56px)] bg-background-50 border-t py-3 px-6 z-40 flex flex-col justify-between border-r border-r-text-100"
          >
            <div className="flex flex-col gap-y-6 hover:cursor-pointer">
              {user && (
                <div
                  className="flex items-center gap-3 mb-6"
                  onClick={() => goToProfile()}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center hover:cursor-pointer transition-all border border-cta-200 hover:border-cta-500">
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
                  <div>
                    <p className="font-semibold">
                      {capitalizeFirstLetter(user.name)}
                    </p>
                    <p className="text-sm text-text-400 truncate max-w-[180px]">
                      {user.email}
                    </p>
                  </div>
                </div>
              )}
              <nav className="space-y-4 ">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 w-full hover:text-cta-500 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  Profil
                </Link>
                <Link
                  to="/dashboard/home"
                  className="flex items-center gap-3 w-full hover:text-cta-500 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false); // Ferme le menu si nécessaire
                    navigate("/dashboard/sessions", {
                      state: { tab: "favorites" },
                    });
                  }}
                  className="flex items-center gap-2 hover:text-cta-500 w-full"
                >
                  <Heart className="w-4 h-4" />
                  Mes favoris
                </button>
                <Link
                  to="/notifications"
                  className="flex items-center gap-3 w-full hover:text-cta-500 rounded "
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
                  className="flex items-center gap-3 w-full hover:text-cta-500 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  <Settings className="w-5 h-5" />
                  Paramètres
                </Link>
                <hr className="my-4" />
                <Link
                  to="/coming-soon"
                  className="flex items-center gap-3 w-full hover:text-cta-500 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  <HelpCircle className="w-5 h-5" />
                  Aide
                </Link>
              </nav>
            </div>

            <div>
              <button
                onClick={() => logout()}
                className="flex items-center gap-2 text-error-500 hover:text-error-700 mb-16"
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
