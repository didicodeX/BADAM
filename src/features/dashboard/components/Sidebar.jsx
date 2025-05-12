import { useState, useRef, useEffect } from "react";
import {
  BookOpen,
  CalendarClock,
  PanelLeftClose,
  PanelRightClose,
  HelpCircle,
  Plus,
} from "lucide-react";
import { Link, useLocation, matchPath, useNavigate } from "react-router-dom";


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const isCreatePage = [
    "/dashboard/create-training",
    "/dashboard/create-session",
  ].includes(location.pathname);
  
  const isMatch = (pattern) => {
    const current = location.pathname;
    if (current === "/dashboard/create-session") return false; // exclure
    return matchPath({ path: `dashboard/${pattern}`, end: false }, current);
  };

  const renderItem = (to, label, icon) => {
    const active = isMatch(to) || location.pathname === `/dashboard/${to}`;
    return (
      <Link
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
      className={`bg-background-50 mt-14 shadow-sm border-r border-r-text-200 h-[calc(100vh-56px)] flex flex-col px-4 py-4 items-start ${
        isOpen ? "w-52" : "w-16"
      }`}
    >
      {/* Haut */}
      <div className="flex flex-col gap-6">
        <button
          onClick={toggleSidebar}
          className={`w-full flex transition-colors hover:text-cta-500`}
        >
          {isOpen ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <PanelRightClose className="w-5 h-5" />
          )}
        </button>

        <nav className="flex flex-col gap-4">
          {/* Bouton + avec menu contextuel */}
          <div className="relative" ref={menuRef}>
            {/* 👇 Ajoute la logique d'activation */}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex w-full hover:text-cta-500 transition-colors ${
                isOpen ? "justify-start gap-3" : ""
              } ${
                isCreatePage ? "text-cta-500 font-semibold" : "text-text-700"
              }`}
              title="Créer"
            >
              <Plus className="w-5 h-5" />
              {isOpen && <span>Créer</span>}
            </button>
            {menuOpen && (
              <div className="absolute left-12 top-0 bg-background-50 border rounded shadow-md z-50 p-2 flex flex-col gap-2 w-56">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/dashboard/create-training");
                  }}
                  className="flex items-center gap-2 px-2 py-1 hover:bg-background-100 text-sm rounded"
                  title="formations"
                >
                  <BookOpen className="w-4 h-4 text-cta-500" />
                  Créer une formation
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/dashboard/create-session");
                  }}
                  className="flex items-center gap-2 px-2 py-1 hover:bg-background-100 text-sm rounded"
                  title="Séssions"
                >
                  <CalendarClock className="w-4 h-4 text-cta-500" />
                  Créer une session
                </button>
              </div>
            )}
          </div>

          {/* Liens normaux */}
          {renderItem(
            "trainings",
            "Mes formations",
            <BookOpen className="w-5 h-5" />
          )}
          {renderItem(
            "sessions",
            "Mes sessions",
            <CalendarClock className="w-5 h-5" />
          )}
        </nav>
      </div>

      {/* Aide en bas */}
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
