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
import { Link, NavLink } from "react-router-dom";

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    {
      icon: <Plus className="w-5 h-5" />,
      label: "Create training",
      to: "/dashboard/create",
    },
    {
      icon: <CalendarCheck2 className="w-5 h-5" />,
      label: "Sessions followed",
      to: "/dashboard/followed-sessions",
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: "Trainings created",
      to: "/dashboard/created-trainings",
    },
    {
      icon: <CalendarClock className="w-5 h-5" />,
      label: "Sessions created",
      to: "/dashboard/created-sessions",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      label: "Favorites",
      to: "/dashboard/favorites",
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
          <NavLink
            end // 👈 important : correspond exactement à "/dashboard" uniquement
            to="/dashboard"
            className={({ isActive }) =>
              `flex gap-3 w-full items-center text-text-700 hover:text-cta-500 ${
                !isOpen ? "justify-center" : ""
              } ${isActive ? "text-cta-500 font-semibold" : ""}`
            }
          >
            <Home className="sm:w-5 sm:h-5 w-4 h-4" />
            {isOpen && <span>Home</span>}
          </NavLink>

          {navItems.map(({ icon, label, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `flex gap-3 w-full items-center text-text-700 hover:text-cta-500 ${
                  !isOpen ? "justify-center" : ""
                } ${isActive ? "text-cta-500 font-semibold" : ""}`
              }
            >
              {icon}
              {isOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Pied de page (aide) */}
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
