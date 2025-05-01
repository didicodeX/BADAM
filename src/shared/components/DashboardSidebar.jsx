import { useState } from "react";
import {
  CalendarCheck2,
  Home,
  Plus,
  CalendarClock,
  BookOpen,
  Heart,
  PanelLeftClose,
  PanelRightClose,
  HelpCircle,
} from "lucide-react";
import { Link, useLocation, matchPath } from "react-router-dom";

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Permet de matcher les sous-routes avec end: false
  const isMatch = (pattern) => {
    return matchPath(
      { path: `dashboard/${pattern}`, end: false },
      location.pathname
    );
  };

  const navItems = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "Home",
      to: "home",
    },
    {
      icon: <Plus className="w-5 h-5" />,
      label: "Create training",
      to: "create",
    },
    {
      icon: <CalendarCheck2 className="w-5 h-5" />,
      label: "Sessions followed",
      to: "followed-sessions",
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: "Trainings created",
      to: "created-trainings",
    },
    {
      icon: <CalendarClock className="w-5 h-5" />,
      label: "Sessions created",
      to: "created-sessions",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      label: "Favorites",
      to: "favorites",
    },
  ];

  return (
    <aside
      className={`bg-background-50 mt-14 shadow-sm border-r border-r-text-100 transition-all duration-300 h-[calc(100vh-56px)] flex flex-col px-4 py-4 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Haut de la sidebar */}
      <div className="flex flex-col gap-6">
        {/* Toggle */}
        <button
          onClick={toggleSidebar}
          className={`w-full flex transition-colors hover:text-cta-500 ${
            !isOpen ? "pl-1.5" : ""
          }`}
        >
          {isOpen ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <PanelRightClose className="w-5 h-5" />
          )}
        </button>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          {navItems.map(({ icon, label, to }) => {
            const active =
              isMatch(to) || location.pathname === `/dashboard/${to}`;

            return (
              <Link
                key={label}
                to={`/dashboard/${to}`}
                className={`flex gap-3 w-full items-center hover:text-cta-500 ${
                  !isOpen ? "justify-center" : ""
                } ${active ? "text-cta-500 font-semibold" : "text-text-700"}`}
              >
                {icon}
                {isOpen && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer (help) */}
      <div className="mt-auto pb-4">
        <Link
          to="/dashboard/help"
          className={`text-text-700 hover:text-cta-500 ${
            !isOpen ? "flex justify-center" : ""
          }`}
        >
          <HelpCircle className="w-5 h-5" />
        </Link>
      </div>
    </aside>
  );
}
