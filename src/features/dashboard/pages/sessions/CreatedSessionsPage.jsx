import LoadingScreen from "@/shared/components/LoadingScreen";
import { useSession } from "../../hooks/useSessions";
import SessionCard from "../../components/SessionCard";
import { Link } from "react-router-dom";
import Section from "@/shared/components/Section";
import EmptySection from "../../components/EmptySection";
import CardListContainer from "@/shared/components/CardListContainer";
import { Plus } from "lucide-react";

export default function CreatedSessionsPage() {
  const { mySessions, isLoadingSessions } = useSession();

  if (isLoadingSessions) return <LoadingScreen />;

  // Grouper les sessions par formation
  const groupedSessions = mySessions.reduce((acc, session) => {
    const trainingId = session.training?._id;
    if (!acc[trainingId]) {
      acc[trainingId] = {
        training: session.training,
        sessions: [],
      };
    }
    acc[trainingId].sessions.push(session);
    return acc;
  }, {});

  return (
    <Section last>
      <h3>Mes séssions créées</h3>
      {/* Liste des formations et sessions */}
      {Object.values(groupedSessions).map(({ training, sessions }) => (
        <Section key={training._id}>
          <div>
            <h4 className="hover:text-cta-500 transition w-fit">
              <Link to={`/dashboard/trainings/${training._id}`}>
                {training.title}
              </Link>
            </h4>
          </div>
          <CardListContainer>
            {sessions.map((session) => (
              <SessionCard
                key={session._id}
                id={session._id}
                trainingTitle={training.title}
                trainingImage={session.coverImage || training.images[0]}
                session={session}
              />
            ))}
          </CardListContainer>
        </Section>
      ))}
      {mySessions.length === 0 && (
        <EmptySection
          title="Aucune session créées pour le moment."
          link={{
            to: "/dashboard/create-session",
            label: "Créées votre première  séssion.",
          }}
        />
      )}
    </Section>
  );
}
