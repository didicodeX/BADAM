import {
  Home,
  Plus,
  CalendarCheck2,
  BookOpen,
  CalendarClock,
  Heart,
} from "lucide-react";
import { Link, useLocation, matchPath } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();

  const isMatch = (pattern) =>
    matchPath({ path: `dashboard/${pattern}`, end: false }, location.pathname);

  const navItems = [
    { icon: <Home />, label: "Accueil", to: "home" },
    { icon: <Plus />, label: "Créer", to: "trainings/create" },
    { icon: <CalendarCheck2 />, label: "Suivies", to: "sessions/followed" },
    { icon: <BookOpen />, label: "Formations", to: "trainings/created" },
    { icon: <CalendarClock />, label: "Créées", to: "sessions/created" },
    { icon: <Heart />, label: "Favoris", to: "sessions/favorites" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-background-50 border-t border-text-100 md:hidden z-50">
      <ul className="flex justify-around items-center py-2">
        {navItems.map(({ icon, label, to }) => {
          const active =
            isMatch(to) || location.pathname === `/dashboard/${to}`;

          return (
            <li key={label}>
              <Link
                to={`/dashboard/${to}`}
                className={`flex flex-col items-center text-xs transition-colors ${
                  active ? "text-cta-500 font-semibold" : "text-text-700"
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
