import { useState, useRef, useEffect } from "react";
import ActionMenuTraining from "../../components/ActionMenuTraining";
import { useParams } from "react-router-dom";
import { useTraining } from "../../hooks/useTrainings";
import { Loader, MoreVertical } from "lucide-react";
import Content from "@/shared/components/Content";
import MediaSlider from "../../components/Slider";
import ConfirmDeleteModal from "@/shared/components/ConfirmDeleteModal";
import { useSession } from "../../hooks/useSessions";
import Section from "@/shared/components/Section";
import SessionCard from "../../components/SessionCard";

export default function TrainingDetailPage() {
  const { id } = useParams();
  const { training, isLoadingTraining, isErrorTraining } = useTraining(id);
  const { mySessionsByTraining: sessions } = useSession(null, id);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const { deleteTraining } = useTraining();

  const handleConfirmDelete = () => {
    deleteTraining(id);
    setShowConfirmDelete(false);
  };

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

  if (isLoadingTraining) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader className="animate-spin w-6 h-6 text-text-500" />
      </div>
    );
  }

  if (isErrorTraining || !training) {
    return (
      <p className="text-center text-red-500">
        Impossible de charger cette formation.
      </p>
    );
  }

  const media = [...(training.images || []), ...(training.videos || [])];

  return (
    <Content>
      {/* title + edit */}
      <div className="flex justify-between items-center">
        <h2>{training.title}</h2>
        <div className="relative" ref={menuRef}>
          <MoreVertical
            className="w-5 h-5 cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          />
          {menuOpen && (
            <div className="absolute right-0 z-10">
              <ActionMenuTraining
                formationId={id}
                closeMenu={() => setMenuOpen(false)}
                onRequestDelete={(e) => {
                  e?.stopPropagation(); // au cas où
                  setShowConfirmDelete(true);
                  setMenuOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
      {/* infos training */}
      <Section>
        <h3>Informations sur la formation</h3>
        <div className="flex w-[330px] sm:w-[500px] md:w-[650px] lg:w-[900px xl:w-[1204px] overflow-hidden">
          {media.length > 0 && <MediaSlider slides={media} />}
        </div>
        <p>{training.description}</p>
      </Section>
      {/* session creer */}
      <Section last>
        <h3>Sessions créées pour cette formation</h3>
        <div className="flex flex-wrap gap-6">
          {sessions.map((session) => (
            <SessionCard
              key={session._id}
              id={session._id}
              trainingTitle={training.title}
              trainingImage={session.coverImage || training.images?.[0]}
              session={session}
            />
          ))}
        </div>
      </Section>
      <ConfirmDeleteModal
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer cette formation"
        message="Cette action est irréversible. Es-tu sûr de vouloir supprimer cette formation ?"
        confirmText="Supprimer"
      />
    </Content>
  );
}
