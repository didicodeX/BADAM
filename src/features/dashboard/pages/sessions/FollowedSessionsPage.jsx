import { useState } from "react";
import { Loader, Search, Star } from "lucide-react";
import useRegistration from "../../hooks/useRegistration";
import ConfirmDeleteModal from "@/shared/components/ConfirmDeleteModal";
import Section from "@/shared/components/Section";
import RegistrationCard from "../../components/RegistrationCard";
import Button from "@/shared/components/Button";
import CardListContainer from "@/shared/components/CardListContainer";
import { Link } from "react-router-dom";
import EmptySection from "../../components/EmptySection";

export default function FollowedSessionsPage() {
  const { followedSessions, isLoadingFollowedSession, unfollowSession } =
    useRegistration();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const handleRequestUnfollow = (sessionId) => {
    setSelectedSessionId(sessionId);
    setIsModalOpen(true);
  };

  const handleConfirmUnfollow = () => {
    if (selectedSessionId) {
      unfollowSession(selectedSessionId);
      setIsModalOpen(false);
      setSelectedSessionId(null);
    }
  };

  if (isLoadingFollowedSession) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader className="animate-spin w-6 h-6 text-text-500" />
      </div>
    );
  }

  // Grouper les sessions par formation
  const grouped = followedSessions.reduce((acc, reg) => {
    const trainingId = reg.session.training?._id;
    if (!acc[trainingId]) {
      acc[trainingId] = {
        training: reg.session.training,
        sessions: [],
      };
    }
    acc[trainingId].sessions.push(reg.session);
    return acc;
  }, {});

  return (
    <Section last>
      <h3>Mes séssions suivies</h3>
      {/* Liste des formations avec leurs sessions suivies */}
      {Object.values(grouped).map(({ training, sessions }) => (
        <Section key={training._id}>
          <div>
            <h4 className="border-b border-b-background-100 w-fit pb-2">
              {training.title}
            </h4>
          </div>
          <CardListContainer>
            {sessions.map((session) => (
              <RegistrationCard
                key={session._id}
                id={session._id}
                trainingTitle={training.title}
                trainingImage={session.coverImage || training.images?.[0]}
                session={session}
                onUnfollow={() => handleRequestUnfollow(session._id)}
              />
            ))}
          </CardListContainer>
        </Section>
      ))}

      {Object.keys(grouped).length === 0 && (
        <EmptySection
          title="Aucune séssion suivie pour le moment."
          link={{ to: "/", label: "Rechercher une session" }}
          icon={<Search className="w-5 h-5" />}
        />
      )}
      {/* Modal de confirmation de suppression */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmUnfollow}
        title="Se désinscrire de la séssion"
        message="Tu es sur le point de te désinscrire. Cette action est irréversible. Veux-tu continuer ?"
        confirmText="Se désinscrire"
      />
    </Section>
  );
}
