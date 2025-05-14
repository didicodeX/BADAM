import Section from "@/shared/components/Section";
import Hello from "../components/Hello";
import FavoriteCard from "../components/FavoriteCard";
import Content from "@/shared/components/Content";
import useHome from "../hooks/useHome";
import { useSessions, useFavorites } from "../store/useHome.store";
import { useAuthStore } from "@/features/auth/store/auth.store";
import SessionCard from "@/features/dashboard/components/SessionCard";
import CardListContainer from "@/shared/components/CardListContainer";
import useRegistration from "@/features/dashboard/hooks/useRegistration";
import RegistrationCard from "@/features/dashboard/components/RegistrationCard"; // ✅ à ajouter si ce n’est pas fait
import LoadingScreen from "@/shared/components/LoadingScreen"; // tu l'avais oublié

export default function HomePage() {
  const { user } = useAuthStore();
  const {
    followedSessions,
    isLoadingFollowedSession,
    isLoadingArchivedSession,
  } = useRegistration();
  
  const { handleToggleFavorite, latest } = useHome();

  const sessions = useSessions();
  const favorites = useFavorites();

  if (isLoadingFollowedSession || isLoadingArchivedSession)
    return <LoadingScreen />;

  return (
    <Section last>
      <Hello />
      <img src="/img/Hero.png" alt="hero" className="w-full" />
      <Content>
        <Section>
          <h3 className="mb-4">Les recommandations</h3>
          <CardListContainer>
            {sessions.slice(0,5).map((session) => {
              const isOwner = session.createdBy === user._id;
              const isRegistered = followedSessions.some(
                (reg) => reg.session?._id === session._id
              );

              if (isOwner) {
                return (
                  <SessionCard
                    key={session._id}
                    id={session._id}
                    trainingTitle={session.training.title}
                    trainingImage={
                      session.coverImage || session.training.images[0]
                    }
                    session={session}
                  />
                );
              }

              if (isRegistered) {
                return (
                  <RegistrationCard
                    key={session._id}
                    id={session._id}
                    trainingTitle={session.training.title}
                    trainingImage={
                      session.coverImage || session.training.images[0]
                    }
                    session={session}
                    onUnfollow={() =>
                      console.log("Unfollow from homepage (TODO)")
                    }
                  />
                );
              }

              return (
                <FavoriteCard
                  key={session._id}
                  id={session._id}
                  trainingTitle={session.training.title}
                  trainingImage={
                    session.coverImage || session.training.images[0]
                  }
                  session={session}
                  isFavorite={favorites.includes(session._id)}
                  onToggleFavorite={() => handleToggleFavorite(session._id)}
                />
              );
            })}
          </CardListContainer>
        </Section>
        <Section last>
          <h3 className="mb-4"> Les nouvelle sessions</h3>
          <CardListContainer>
            {latest.map((session) => {
              const isOwner = session.createdBy === user._id;
              const isRegistered = followedSessions.some(
                (reg) => reg.session?._id === session._id
              );

              if (isOwner) {
                return (
                  <SessionCard
                    key={session._id}
                    id={session._id}
                    trainingTitle={session.training.title}
                    trainingImage={
                      session.coverImage || session.training.images[0]
                    }
                    session={session}
                  />
                );
              }

              if (isRegistered) {
                return (
                  <RegistrationCard
                    key={session._id}
                    id={session._id}
                    trainingTitle={session.training.title}
                    trainingImage={
                      session.coverImage || session.training.images[0]
                    }
                    session={session}
                    onUnfollow={() =>
                      console.log("Unfollow from homepage (TODO)")
                    }
                  />
                );
              }

              return (
                <FavoriteCard
                  key={session._id}
                  id={session._id}
                  trainingTitle={session.training.title}
                  trainingImage={
                    session.coverImage || session.training.images[0]
                  }
                  session={session}
                  isFavorite={favorites.includes(session._id)}
                  onToggleFavorite={() => handleToggleFavorite(session._id)}
                />
              );
            })}
          </CardListContainer>
        </Section>
      </Content>
    </Section>
  );
}
