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
// import SearchInput from "@/shared/components/SearchInput";
// import { baseStyle, solidStyle } from "@/shared/lib/buttonStyle";
export default function DashboardNavbarMobile({ menuOpen, setMenuOpen }) {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const navigate = useNavigate();

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

        <div className="text-xl text-center font-bold w-full">
          <Link to="/">
            BA<span className="text-cta-500">DAM</span>
          </Link>
        </div>

        {/* <Link
          to="/dashboard/create" className="flex items-center justify-center text-white bg-cta-700 w-8 px-2 rounded-full h-8"
        >
          <Plus className="w-4 h-4" />
        </Link> */}

        {/* <SearchInput mobile onClose={false}/> */}
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
                  onClick={() => navigate("/profile")}
                >
                  <div className="w-10 h-10 rounded-full bg-cta-200 flex items-center justify-center">
                    {getInitials(user.name)}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {capitalizeFirstLetter(user.name)}
                    </p>
                    <p className="text-sm text-text-400">{user.email}</p>
                  </div>
                </div>
              )}
              <nav className="space-y-4 ">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 w-full hover:text-cta-500 rounded"
                >
                  <User className="w-5 h-5" />
                  Profil
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 w-full hover:text-cta-500 rounded"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link
                  to="/favorites"
                  className="flex items-center gap-3 w-full hover:text-cta-500 rounded"
                >
                  <Heart className="w-5 h-5" />
                  Mes favories
                </Link>
                <Link
                  to="/notifications"
                  className="flex items-center gap-3 w-full hover:text-cta-500 rounded"
                >
                  <Bell className="w-5 h-5" />
                  Notifications
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-3 w-full hover:text-cta-500 rounded"
                >
                  <Settings className="w-5 h-5" />
                  Paramètres
                </Link>
                <hr className="my-4" />
                <Link
                  to="/help"
                  className="flex items-center gap-3 w-full hover:text-cta-500 rounded"
                >
                  <HelpCircle className="w-5 h-5" />
                  Aide
                </Link>
              </nav>
            </div>

            <div>
              <button
                onClick={() => logout()}
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
