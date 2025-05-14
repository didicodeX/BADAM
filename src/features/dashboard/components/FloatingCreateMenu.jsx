import { useState, useRef, useEffect } from "react";
import { Plus, BookOpen, CalendarClock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FloatingCreateMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative z-50">
      {/* FAB button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative z-50 p-4 rounded-full bg-cta-500 text-white shadow-lg flex items-center justify-center transition hover:bg-cta-600"
        title="Créer"
      >
        <Plus className="w-6 h-6 pointer-events-none" />
      </button>

      {/* Actions radial spread */}
      <div className="absolute  bottom-16 -translate-x-1/2 pointer-events-none">
        <button
          onClick={() => {
            setOpen(false);
            navigate("/dashboard/create-training");
          }}
          className={`absolute w-12 h-12 rounded-full bg-white border border-text-200 shadow-md flex items-center justify-center transition hover:bg-cta-50
      ${
        open
          ? "translate-x-[-45px] translate-y-[-45px] opacity-100"
          : "opacity-0 scale-50 pointer-events-none"
      }
      pointer-events-auto
    `}
          title="Créer une formation"
        >
          <BookOpen className="w-5 h-5 text-cta-500" />
        </button>

        <button
          onClick={() => {
            setOpen(false);
            navigate("/dashboard/create-session");
          }}
          className={`absolute w-12 h-12 rounded-full bg-white border border-text-200 shadow-md flex items-center justify-center transition hover:bg-cta-50 
      ${
        open
          ? "translate-x-[45px] translate-y-[-45px] opacity-100"
          : "opacity-0 scale-50 pointer-events-none"
      }
      pointer-events-auto
    `}
          title="Créer une séssion"
        >
          <CalendarClock className="w-5 h-5 text-cta-500" />
        </button>
      </div>
    </div>
  );
}
