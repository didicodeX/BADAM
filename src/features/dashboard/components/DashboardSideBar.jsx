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
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const isMatch = (pattern) => {
    return matchPath(
      { path: `dashboard/${pattern}`, end: false },
      location.pathname
    );
  };

  const renderItem = (to, label, icon) => {
    const active = isMatch(to) || location.pathname === `/dashboard/${to}`;

    return (
      <Link
        key={label}
        to={`/dashboard/${to}`}
        className={`flex gap-3 w-full items-center hover:text-cta-500 transition-all ${
          !isOpen ? "justify-center" : ""
        } ${active ? "text-cta-500 font-semibold" : "text-text-700"}`}
      >
        {icon}
        {isOpen && <span>{label}</span>}
      </Link>
    );
  };

  return (
    <aside
      className={`bg-background-50 mt-14 shadow-sm border-r border-r-text-200 h-[calc(100vh-56px)] flex flex-col px-4 py-4 ${
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

        {/* Navigation générale */}
        <nav className="flex flex-col gap-4">
          {renderItem("home", "Accueil", <Home className="w-5 h-5" />)}
          {renderItem("trainings/create", "Créer une formation", <Plus className="w-5 h-5" />)}
          {renderItem("trainings/created", "Mes formations créées", <BookOpen className="w-5 h-5" />)}
        </nav>

        {/* Section Sessions */}
        <nav className="mt-4 flex flex-col gap-4">
          {renderItem("sessions/followed", "Mes sessions suivies", <CalendarCheck2 className="w-5 h-5" />)}
          {renderItem("sessions/created", "Mes sessions créées", <CalendarClock className="w-5 h-5" />)}
          {renderItem("sessions/favorites", "Mes favoris", <Heart className="w-5 h-5" />)}
        </nav>
      </div>

      {/* Footer (aide) */}
      <div className="mt-auto pb-4">
        <Link
          to="/help"
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
