import { useNavigate } from "react-router-dom";
import useRegistration from "@/features/dashboard/hooks/useRegistration";
import Statistique from "../../components/Statistique";
import Content from "@/shared/components/Content";
import Section from "@/shared/components/Section";
import { useSession } from "../../hooks/useSessions";
import { useTraining } from "../../hooks/useTrainings";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Link } from "react-router-dom";
import RegistrationCard from "../../components/RegistrationCard";
import { Loader } from "lucide-react";
import SessionCard from "../../components/SessionCard";
import TrainingCard from "../../components/TrainingCard";
import Button from "@/shared/components/Button";
import { formatName } from "@/shared/utils/formatName";

export default function DashboardHomePage() {
  const { user } = useAuthStore();
  const { followedSessions, unfollowSession, isLoadingFollowedSession } =
    useRegistration();
  const { mySessions } = useSession();
  const { myTrainings } = useTraining();
  const navigate = useNavigate();

  if (isLoadingFollowedSession) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader className="animate-spin w-6 h-6 text-text-500" />
      </div>
    );
  }

  return (
    <Content>
      <h1>Bienvenue, {formatName(user?.name)} !</h1>

      <Section>
        <div className="flex flex-wrap gap-4  justify-center">
          <Statistique title="Formations créées" count={myTrainings.length} />
          <Statistique title="Sessions créées" count={mySessions.length} />
          <Statistique
            title="Sessions suivies"
            count={followedSessions.length}
          />
        </div>
        <div>
          <h3>Que souhaite vous faire aujourd'hui?</h3>
          <p>Nous facilitons la planification...</p>
          <ul>
            <li className="text-text-500 cursor-pointer hover:text-cta-500">
              <Link to={"/dashboard/create-training"}>Créer une formation</Link>
            </li>
            <Link to="/dashboard/trainings" />
            <li className="text-text-500 cursor-pointer hover:text-cta-500">
              <Link to={"/dashboard/create-session"}>Créer une séssion </Link>
            </li>
            <li className="text-text-500 cursor-pointer hover:text-cta-500">
              <button
                onClick={() => {
                  navigate("/dashboard/sessions", {
                    state: { tab: "favorites" },
                  });
                }}
                className="flex items-center gap-2 hover:text-cta-500"
              >
                Voir vos favoris
              </button>
            </li>
          </ul>
        </div>
      </Section>
      <Section>
        <h3>Mes Formations créées</h3>
        <div className="flex gap-6 flex-wrap">
          {myTrainings.slice(0, 3).map((training) => (
            <TrainingCard
              key={training._id}
              id={training._id}
              title={training.title}
              description={training.description}
              imageUrl={training.images[0]}
            />
          ))}
        </div>
        {myTrainings.length > 3 && (
          <Link
            className="w-14 h-14 rounded-full bg-background-100 flex items-center justify-center text-sm text-cta-500"
            to={`/dashboard/trainings/created`}
          >
            +{myTrainings.length - 3}
          </Link>
        )}
        {myTrainings.length === 0 && (
          <div className="flex flex-col items-center gap-6">
            <p className="text-center text-text-500 mt-8">
              Aucune formation pour le moment.
            </p>
            <Button to={"/dashboard/trainings/create"}>Creer</Button>
          </div>
        )}
      </Section>
      <Section>
        <h3>Mes Sessions créées</h3>
        <div className="flex gap-6 flex-wrap">
          {mySessions.slice(0, 3).map((session) => (
            <SessionCard
              key={session._id}
              id={session._id}
              trainingTitle={session.training.title}
              trainingImage={session.coverImage || session.training.images[0]}
              session={session}
            />
          ))}
        </div>
        {mySessions.length > 3 && (
          <Link
            className="w-14 h-14 rounded-full bg-background-100 flex items-center justify-center text-sm text-cta-500"
            to={`/dashboard/sessions/created`}
          >
            +{mySessions.length - 3}
          </Link>
        )}
        {mySessions.length === 0 && (
          <div className="flex flex-col items-center gap-6">
            <p className="text-center text-text-500 mt-8">
              Vous devez d'abord creer une session.
            </p>
            <Button to={"/dashboard/trainings/create"}>Creer</Button>
          </div>
        )}
      </Section>
      <Section last>
        <h3>Mes Sessions suivies</h3>
        <div className="flex flex-wrap gap-4">
          {followedSessions.slice(0, 3).map((session) => (
            <RegistrationCard
              key={session._id}
              id={session.session._id}
              trainingTitle={session.session.training.title}
              trainingImage={
                session.session.coverImage ||
                session.session.training.images?.[0]
              }
              session={session.session}
              onUnfollow={() => unfollowSession(session._id)}
            />
          ))}
        </div>
        {followedSessions.length > 3 && (
          <Link
            className="w-14 h-14 rounded-full bg-background-100 flex items-center justify-center text-sm text-cta-500"
            to={`/dashboard/sessions/followed`}
          >
            +{mySessions.length - 3}
          </Link>
        )}
        {followedSessions.length === 0 && (
          <div className="flex flex-col items-center gap-6">
            <p className="text-center text-text-500 mt-8">
              Aucune session suivie pour le moment.
            </p>
            <Button to={"/"}>rechercher une session</Button>
          </div>
        )}
      </Section>
    </Content>
  );
}
