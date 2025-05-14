import { Search } from "lucide-react";
import useRegistration from "../../hooks/useRegistration";
import Section from "@/shared/components/Section";
import RegistrationCard from "../../components/RegistrationCard";
import CardListContainer from "@/shared/components/CardListContainer";
import EmptySection from "../../components/EmptySection";
import LoadingScreen from "@/shared/components/LoadingScreen";

export default function FollowedSessionsPage() {
  const { followedSessions, isLoadingFollowedSession, unfollowSession } =
    useRegistration();

  if (isLoadingFollowedSession) return <LoadingScreen />;

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
                onUnfollow={unfollowSession} // ✅ fonction directe
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
    </Section>
  );
}
