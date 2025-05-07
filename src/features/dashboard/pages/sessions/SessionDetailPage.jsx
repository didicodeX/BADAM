import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSession } from "../../hooks/useSessions";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Loader, MoreVertical } from "lucide-react";
import Section from "@/shared/components/Section";
import Status from "../../../../shared/components/Status";
import Button from "@/shared/components/Button";
import ReviewCard from "../../components/ReviewCard";
import Content from "@/shared/components/Content";
import ConfirmDeleteModal from "@/shared/components/ConfirmDeleteModal";
import ActionMenuSession from "../../components/ActionMenuSession";
import ParticipantCard from "../../components/ParticipantCard";

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
              {format(new Date(session.startDateTime), "MMMM d", {
                locale: enUS,
              })}{" "}
              to{" "}
              {format(new Date(session.endDateTime), "MMMM d", {
                locale: enUS,
              })}
              , {format(new Date(session.startDateTime), "p", { locale: enUS })}{" "}
              to {format(new Date(session.endDateTime), "p", { locale: enUS })}{" "}
              ADT
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
                {registrations.slice(0, 5).map((r) => (
                  <ParticipantCard key={r._id} participant={r.participant} />
                ))}
              </div>
              {registrations.length > 5 && (
                <Link
                  className="w-14 h-14 rounded-full bg-background-100 flex items-center justify-center text-sm text-cta-500"
                  to={`/dashboard/sessions/${session._id}/participants`}
                >
                  +{registrations.length - 5}
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
            {reviews.slice(0, 3).map((review, index, array) => (
              <Section key={review._id} last={index === array.length - 1}>
                <ReviewCard review={review} />
              </Section>
            ))}

            {reviews.length > 3 && (
              <Button to={`/dashboard/sessions/${session._id}/reviews`}>
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
