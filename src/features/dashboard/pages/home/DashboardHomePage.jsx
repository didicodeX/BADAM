import { Search } from "lucide-react";
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
import SessionCard from "../../components/SessionCard";
import TrainingCard from "../../components/TrainingCard";
import { formatName } from "@/shared/utils/formatName";
import CardListContainer from "@/shared/components/CardListContainer";
import EmptySection from "../../components/EmptySection";
import LoadingScreen from "@/shared/components/LoadingScreen";

export default function DashboardHomePage() {
  const { user } = useAuthStore();
  const { followedSessions, unfollowSession, isLoadingFollowedSession } =
    useRegistration();
  const { mySessions } = useSession();
  const { myTrainings } = useTraining();
  const navigate = useNavigate();

  if (isLoadingFollowedSession) return <LoadingScreen/>

  return (
    <Content>
      <h1>Bienvenue, {formatName(user?.name)} !</h1>

      <Section>
        <div className="flex flex-wrap gap-4 justify-center">
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
        <CardListContainer>
          {myTrainings.slice(0, 3).map((training) => (
            <TrainingCard
              key={training._id}
              id={training._id}
              title={training.title}
              description={training.description}
              imageUrl={training.images[0]}
            />
          ))}
        </CardListContainer>
        {myTrainings.length > 3 && (
          <Link
            className="w-14 h-14 rounded-full bg-background-100 flex items-center justify-center text-sm text-cta-500"
            to={`/dashboard/trainings`}
          >
            +{myTrainings.length - 3}
          </Link>
        )}
        {myTrainings.length === 0 && (
          <EmptySection
            title="Aucune formation créées pour le moment."
            link={{
              to: "/dashboard/create-training",
              label: "Créées votre première  séssion.",
            }}
          />
        )}
      </Section>
      <Section>
        <h3>Mes Sessions créées</h3>
        <CardListContainer>
          {mySessions.slice(0, 3).map((session) => (
            <SessionCard
              key={session._id}
              id={session._id}
              trainingTitle={session.training.title}
              trainingImage={session.coverImage || session.training.images[0]}
              session={session}
            />
          ))}
        </CardListContainer>
        {mySessions.length > 3 && (
          <button
            className="w-14 h-14 rounded-full bg-background-100 flex items-center justify-center text-sm text-cta-500"
            onClick={() =>
              navigate("/dashboard/sessions", {
                state: { tab: "created" },
              })
            }
          >
            +{mySessions.length - 3}
          </button>
        )}
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
      <Section last>
        <h3>Mes Sessions suivies</h3>
        <CardListContainer>
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
        </CardListContainer>
        {followedSessions.length > 3 && (
          <button
            className="w-14 h-14 rounded-full bg-background-100 flex items-center justify-center text-sm text-cta-500"
            onClick={() =>
              navigate("/dashboard/sessions", {
                state: { tab: "followed" },
              })
            }
          >
            +{mySessions.length - 3}
          </button>
        )}
        {followedSessions.length === 0 && (
          <EmptySection
            title="Aucune séssion suivie pour le moment."
            link={{ to: "/", label: "Rechercher une session" }}
            icon={<Search className="w-5 h-5" />}
          />
        )}
      </Section>
    </Content>
  );
}
