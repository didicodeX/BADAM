import { useState } from "react";
import LoadingScreen from "@/shared/components/LoadingScreen";
import Content from "@/shared/components/Content";
import { useSession } from "../../hooks/useSessions";
import { Search } from "lucide-react";
import SessionCard from "../../components/SessionCard";
import { Link } from "react-router-dom";

export default function CreatedSessionsPage() {
  const [isFocused, setIsFocused] = useState(false);
  const { mySessions, isLoadingSessons } = useSession();

  if (isLoadingSessons) return <LoadingScreen />;

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
    <Content>
      <h2>Mes sessions créées</h2>

      <div className="flex flex-col gap-8">
        {/* Barre de recherche */}
        <div className="py-4 flex justify-center">
          <div
            className={`flex items-center justify-between border rounded-full px-6 py-3 w-full max-w-[500px] ${
              isFocused ? "border-cta-500" : "border-text-200"
            }`}
          >
            <input
              type="search"
              placeholder="Rechercher une session..."
              className="w-full text-sm focus:outline-none"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <Search className="w-5 h-5" />
          </div>
        </div>

        {/* Liste des formations et sessions */}
        {Object.values(groupedSessions).map(({ training, sessions }) => (
          <div key={training._id} className="space-y-4">
            <div>
              <h4>{training.title}</h4>
              <small className="hover:text-cta-500 transition">
                <Link to={`/dashboard/trainings/${training._id}`}>
                  Voir la formation
                </Link>
              </small>
            </div>
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
          </div>
        ))}
      </div>
    </Content>
  );
}
