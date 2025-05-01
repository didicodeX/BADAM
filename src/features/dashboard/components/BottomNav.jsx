import {
  Home,
  Plus,
  CalendarCheck2,
  BookOpen,
  CalendarClock,
  Heart,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { icon: <Home />, label: "Accueil", to: "/dashboard/home" },
    { icon: <Plus />, label: "Créer", to: "/dashboard/create" },
    { icon: <CalendarCheck2 />, label: "Suivies", to: "/dashboard/followed-sessions" },
    { icon: <BookOpen />, label: "Formations", to: "/dashboard/created-trainings" },
    { icon: <CalendarClock />, label: "Créées", to: "/dashboard/created-sessions" },
    { icon: <Heart />, label: "Favoris", to: "/dashboard/favorites" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-background-50 border-t border-text-100 md:hidden z-50">
      <ul className="flex justify-around items-center py-2">
        {navItems.map(({ icon, label, to }) => {
          const isActive = location.pathname.startsWith(to);

          return (
            <li key={label}>
              <Link
                to={to}
                className={`flex flex-col items-center text-xs ${
                  isActive ? "text-cta-500 font-semibold" : "text-text-700"
                }`}
              >
                <div className="w-5 h-5">{icon}</div>
                <span className="text-[10px]">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
