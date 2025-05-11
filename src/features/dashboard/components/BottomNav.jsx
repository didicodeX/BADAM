import { BookOpen, CalendarClock, Plus } from "lucide-react";
import { Link, useLocation, matchPath } from "react-router-dom";
import FloatingCreateMenu from "./FloatingCreateMenu";

export default function BottomNav() {
  const location = useLocation();
  // const navigate = useNavigate();

  const isMatch = (pattern) =>
    matchPath({ path: `dashboard/${pattern}`, end: false }, location.pathname);

  const navItems = [
    { icon: <BookOpen />, label: "Formations", to: "trainings" },
    { icon: <CalendarClock />, label: "Sessions", to: "sessions" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-background-50 border-t border-text-100 md:hidden z-50">
      <ul className="flex justify-around items-center py-2 relative">
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

        {/* Floating center button */}
        {/* <li className="absolute -top-5 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => navigate("/dashboard/create")}
            className="bg-cta-500 hover:bg-cta-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
            title="Créer une formation"
          >
            <Plus className="w-5 h-5" />
          </button>
        </li> */}
        <li className="absolute -top-5 left-1/2 transform -translate-x-1/2">
          <FloatingCreateMenu />
        </li>
      </ul>
    </nav>
  );
}
