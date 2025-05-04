import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import ActionMenuTraining from "./ActionMenuTraining";

export default function TrainingCard({ id, title, description, imageUrl }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  // Fermer le menu si clic à l'extérieur
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCardClick = () => {
    navigate(`/dashboard/trainings/${id}`);
  };

  return (
    <div className="flex-grow flex-shrink min-w-[300px] basis-[300px] max-w-[400px] w-full flex flex-col cursor-pointer" onClick={handleCardClick}>
      <img
        src={imageUrl}
        alt={title}
        className="h-[147px] object-cover rounded-lg"
      />

      <div className="flex justify-between gap-2">
        <div className="flex flex-col">
          <h4 className="line-clamp-1">{title}</h4>
          <small className="line-clamp-3">{description}</small>
        </div>
        <div className="relative" ref={menuRef}>
          <MoreHorizontal
            className="w-5 h-5 cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          />
          {menuOpen && (
            <div className="absolute right-0 z-10">
              <ActionMenuTraining
                formationId={id}
                closeMenu={() => setMenuOpen(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
