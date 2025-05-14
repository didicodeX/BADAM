import { MoreVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSession } from "../../hooks/useSessions";
import { format } from "date-fns";
import { frCA } from "date-fns/locale";
import Section from "@/shared/components/Section";
import Status from "../../../../shared/components/Status";
import Button from "@/shared/components/Button";
import ReviewCard from "../../components/ReviewCard";
import Content from "@/shared/components/Content";
import ConfirmDeleteModal from "@/shared/components/ConfirmDeleteModal";
import ActionMenuSession from "../../components/ActionMenuSession";
import ParticipantCard from "../../components/ParticipantCard";
import LoadingScreen from "@/shared/components/LoadingScreen";

export default function SessionDetailPage() {
  const { id } = useParams();
  const { mySessionDetail, isLoadingMySessionDetail } = useSession(id);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
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

  if (isLoadingMySessionDetail) return <LoadingScreen />;

  const { session, registrations = [], reviews = [] } = mySessionDetail;
  const training = session.training;
  const image = session.coverImage || training.images?.[0];

  return (
    <Content>
      <div className="flex justify-between items-center">
        <h2 className="hover:text-cta-500 transition">
          <Link to={`/dashboard/trainings/${training._id}`}>
            {training.title}
          </Link>
        </h2>
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
        <h3>Informations sur la session</h3>
        <Section last>
          <img
            src={image}
            alt="cover"
            className="w-full md:max-h-[400px] max-w-[900px] max-h-[300px] rounded-xl"
          />
          <div className="flex flex-col gap-2">
            <p>{training.description}</p>
            <p className="font-bold">{session.address}</p>
            <small className="font-bold">
              Du{" "}
              {format(new Date(session.startDateTime), "EEEE d MMMM yyyy 'à' p", {
                locale: frCA,
              })}{" "}
              au{" "}
              {format(new Date(session.endDateTime), "EEEE d MMMM yyyy 'à' p", {
                locale: frCA,
              })}
            </small>
          </div>
          <div>
            <Status
              taken={session.currentNbParticipants}
              total={session.maxParticipants}
              expired={new Date(session.endDateTime) < new Date()}
            />
          </div>
        </Section>
      </Section>

      {/* Section 2 - Participants */}
      <Section>
        <h3>Liste des participants</h3>
        <Section last>
          {registrations.length === 0 ? (
            <small className="text-cta-500">
              Aucun participant pour le moment.
            </small>
          ) : (
            <div className="flex gap-6">
              <div className="flex items-center gap-4 flex-wrap w-1/2">
                {registrations.slice(0, 2).map((r) => (
                  <ParticipantCard key={r._id} participant={r.participant} />
                ))}
              </div>
              {registrations.length > 2 && (
                <Link
                  className="w-14 h-14 rounded-full bg-background-100 flex items-center justify-center text-sm text-cta-500"
                  to={`/dashboard/sessions/${session._id}/participants`}
                >
                  +{registrations.length - 2}
                </Link>
              )}
            </div>
          )}
        </Section>
      </Section>

      {/* Section 3 - Avis */}
      <Section last>
        <h3>Vos avis</h3>
        {reviews.length === 0 ? (
          <small className="text-cta-500">
            Aucun avis n'a encore été laissé pour cette session.
          </small>
        ) : (
          <Section last>
            {reviews.slice(0, 5).map((review, index, array) => (
              <Section key={review._id} last={index === array.length - 1}>
                <ReviewCard review={review} />
              </Section>
            ))}
            {reviews.length > 5 && (
              <Button
                onClick={() =>
                  navigate(`/dashboard/sessions/${session._id}/reviews`, {
                    state: { trainingId: training._id },
                  })
                }
              >
                Voir tous les avis
              </Button>
            )}
          </Section>
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
