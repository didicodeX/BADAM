import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Heart,
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getInitials } from "../utils/getInitials";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import useNotifications from "@/features/notifications/hooks/useNotifications";

export default function UserMenu({ user, onClose }) {
  const { logout } = useAuth();
  const { hasUnreadNotifications } = useNotifications();
  return (
    <div className="absolute right-0 top-14 bg-background-50 border rounded shadow-md w-64 p-4 z-50">
      <div className="flex items-center gap-3 mb-4 border-b pb-2">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-cta-100 border border-cta-200 flex items-center justify-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-cta-700">
              {getInitials(user.name)}
            </span>
          )}
        </div>

        <div>
          <p className="font-bold">{capitalizeFirstLetter(user.name)}</p>
          <p className="text-sm text-text-400">{user.email}</p>
        </div>
      </div>

      <div className="space-y-2 border-b pb-2">
        <Link
          to="/dashboard/home"
          className="flex items-center gap-2 hover:text-cta-500"
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
        <Link
          to="/dashboard/sessions/favorites"
          className="flex items-center gap-2 hover:text-cta-500"
        >
          <Heart className="w-4 h-4" />
          Mes favories
        </Link>
      </div>

      <div className="space-y-2 mt-2 border-b pb-2">
        <Link
          to="/profile"
          className="flex items-center gap-2 hover:text-cta-500"
        >
          <User className="w-4 h-4" />
          Profil
        </Link>
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
          to="/settings"
          className="flex items-center gap-2 hover:text-cta-500"
        >
          <Settings className="w-4 h-4" />
          Paramètres
        </Link>
        <Link to="/help" className="flex items-center gap-2 hover:text-cta-500">
          <HelpCircle className="w-4 h-4" />
          Aide
        </Link>
      </div>

      <div className="pt-2">
        <button
          onClick={() => {
            logout();
            onClose();
          }}
          className="flex items-center gap-2 text-error-500 hover:text-error-700"
        >
          <LogOut className="w-4 h-4" />
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
