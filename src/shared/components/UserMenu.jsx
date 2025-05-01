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

export default function UserMenu({ user, onClose }) {
  const { logout } = useAuth();

  return (
    <div className="absolute right-0 top-14 bg-background-50 border rounded shadow-md w-64 p-4 z-50">
      <div className="flex items-center gap-3 mb-4 border-b pb-2">
        <div className="w-10 h-10 rounded-full bg-cta-200 flex items-center justify-center">
              {getInitials(user.name)}
        </div>
        <div>
          <p className="font-bold">{capitalizeFirstLetter(user.name)}</p>
          <p className="text-sm text-text-400">{user.email}</p>
        </div>
      </div>

      <div className="space-y-2 border-b pb-2">
        <Link to="/dashboard" className="flex items-center gap-2 hover:text-cta-500">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
        <Link to="/dashboard/favorites" className="flex items-center gap-2 hover:text-cta-500">
          <Heart className="w-4 h-4" />
          Mes favoris
        </Link>
        <Link to="/notifications" className="flex items-center gap-2 hover:text-cta-500">
          <Bell className="w-4 h-4" />
          Notifications
        </Link>
      </div>

      <div className="space-y-2 mt-2 border-b pb-2">
        <Link to="/profile" className="flex items-center gap-2 hover:text-cta-500">
          <User className="w-4 h-4" />
          Profile
        </Link>
        <Link to="/settings" className="flex items-center gap-2 hover:text-cta-500">
          <Settings className="w-4 h-4" />
          Settings
        </Link>
        <Link to="/aide" className="flex items-center gap-2 hover:text-cta-500">
          <HelpCircle className="w-4 h-4" />
          Help
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
          Log out
        </button>
      </div>
    </div>
  );
}
