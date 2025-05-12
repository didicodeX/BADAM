import LoadingScreen from "@/shared/components/LoadingScreen";
import Content from "@/shared/components/Content";
import { useSession } from "../../hooks/useSessions";
import { Search } from "lucide-react";
import SessionCard from "../../components/SessionCard";
import { Link } from "react-router-dom";
import Section from "@/shared/components/Section";
import Button from "@/shared/components/Button";

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
      <h3>Mes sessions créées</h3>
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
          <div className="flex flex-wrap gap-6">
            {sessions.map((session) => (
              <SessionCard
                key={session._id}
                id={session._id}
                trainingTitle={training.title}
                trainingImage={session.coverImage || training.images[0]}
                session={session}
              />
            ))}
          </div>
        </Section>
      ))}
      {mySessions.length === 0 && (
        <div className="flex flex-col items-center gap-6">
          <p className="text-center text-text-500 mt-8">
            Vous devez d'abord creer une session.
          </p>
          <Button to={"/dashboard/trainings/create"}>Creer</Button>
        </div>
      )}
    </Section>
  );
}
