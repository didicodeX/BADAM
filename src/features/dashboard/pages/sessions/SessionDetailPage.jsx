import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSession } from "../../hooks/useSessions";
// import { formatDate } from "@/shared/utils/formatDate";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Loader, MoreVertical } from "lucide-react";
import Section from "@/shared/components/Section";
import Status from "../../components/Status";
import Button from "@/shared/components/Button";
import ParticipantsList from "../../components/ParticipantsList";
import ReviewCard from "../../components/ReviewCard";
import Content from "@/shared/components/Content";
import ConfirmDeleteModal from "@/shared/components/ConfirmDeleteModal";
import ActionMenuSession from "../../components/ActionMenuSession";

export default function SessionDetailPage() {
  const { id } = useParams();
  const { mySessionDetail, isLoadingMySessionDetail } = useSession(id);

  console.log(mySessionDetail);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const { deleteSession } = useSession();

  const openDeleteModal = () => {
    setShowConfirmDelete(true);
    setMenuOpen(false); // facultatif, pour fermer le menu si tu veux
  };

  const handleConfirmDelete = () => {
    deleteSession(id);
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

  if (isLoadingMySessionDetail) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader className="animate-spin w-6 h-6 text-text-500" />
      </div>
    );
  }

  const { session, registrations = [], reviews = [] } = mySessionDetail;
  const training = session.training;
  const image = session.coverImage || training.images?.[0];

  return (
    <Content>
      <div className="flex justify-between items-center">
        <h2>{training.title}</h2>
        <div className="relative" ref={menuRef}>
          <MoreVertical
            className="w-5 h-5 cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          />
          {menuOpen && (
            <div className="absolute right-0 z-10">
              <ActionMenuSession
                sessionId={id}
                closeMenu={() => setMenuOpen(false)}
                onRequestDelete={openDeleteModal}
              />
            </div>
          )}
        </div>
      </div>
      {/* Section 1 - Informations sur la session */}
      <Section>
        <h4>Informations sur la session</h4>
        <Section last>
          <img
            src={image}
            alt="cover"
            className="w-full md:h-[400px] max-w-[900px] rounded-xl"
          />
          <p>{training.description}</p>
          <small className="font-medium">
            {format(new Date(session.startDateTime), "MMMM d", {
              locale: enUS,
            })}{" "}
            to{" "}
            {format(new Date(session.endDateTime), "MMMM d", { locale: enUS })},{" "}
            {format(new Date(session.startDateTime), "p", { locale: enUS })} to{" "}
            {format(new Date(session.endDateTime), "p", { locale: enUS })} ADT
          </small>
          <div className="flex justify-between items-center">
            <Status
              taken={session.currentNbParticipants}
              total={session.maxParticipants}
              expired={new Date(session.endDateTime) < new Date()}
            />{" "}
            <Button>Gérer la session</Button>
          </div>
        </Section>
      </Section>

      {/* Section 2 - Participants */}
      <Section>
        <h4>Liste des participants</h4>
        {registrations.length === 0 ? (
          <small className="text-cta-500">
            Aucun participant pour le moment.
          </small>
        ) : (
          <ParticipantsList
            participants={registrations.map((r) => r.participant)}
          />
        )}
      </Section>

      {/* Section 3 - Avis */}
      <Section last>
        <h4>Vos avis</h4>
        {reviews.length === 0 ? (
          <small className="text-cta-500">
            Aucun avis n'a encore été laissé pour cette session.
          </small>
        ) : (
          <div className="space-y-4">
            {reviews.slice(0, 3).map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
            {reviews.length > 3 && (
              <Button
                variant="ghost"
                to={`/dashboard/reviews/session/${session._id}`}
              >
                Voir tous les avis
              </Button>
            )}
          </div>
        )}
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
