import Section from "@/shared/components/Section";
import Hello from "../components/Hello";
import FavoriteCard from "../components/FavoriteCard";
import Content from "@/shared/components/Content";
import useHome from "../hooks/useHome";
import { useSessions, useFavorites } from "../store/useHome.store";
import { useAuthStore } from "@/features/auth/store/auth.store";
import SessionCard from "@/features/dashboard/components/SessionCard";
import CardListContainer from "@/shared/components/CardListContainer";

export default function HomePage() {
  const { user } = useAuthStore();

  const { handleToggleFavorite, latest } = useHome();

  // if (isLoadingAllSession) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[200px]">
  //       <Loader className="animate-spin w-6 h-6 text-text-500" />
  //     </div>
  //   );
  // }

  const sessions = useSessions();
  const favorites = useFavorites();

  return (
    <Section last>
      <Hello />
      <img src="/img/Hero.png" alt="hero" className="w-full" />
      <Content>
        <Section>
          <h3 className="mb-4">Les recommandations</h3>
          <CardListContainer>
            {sessions.map((session) => {
              const isOwner = session.createdBy === user._id;
              return isOwner ? (
                <SessionCard
                  key={session._id}
                  id={session._id}
                  trainingTitle={session.training.title}
                  trainingImage={session.coverImage || session.training.images[0]}
                  session={session}
                />              ) : (
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
            {latest.map((session) => (
              <FavoriteCard
                key={session._id}
                id={session._id}
                trainingTitle={session.training.title}
                trainingImage={session.coverImage || session.training.images[0]}
                session={session}
                isFavorite={favorites.includes(session._id)}
                onToggleFavorite={() => handleToggleFavorite(session._id)}
              />
            ))}
          </CardListContainer>
        </Section>
      </Content>
    </Section>
  );
}
