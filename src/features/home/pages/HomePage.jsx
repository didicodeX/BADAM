import Section from "@/shared/components/Section";
import Hello from "../components/Hello";
import FavoriteSessionCard from "../components/FavoriteSessionCard";
import Content from "@/shared/components/Content";
import useHome from "../hooks/useHome";
import { useSessions, useFavorites } from "../store/useHome.store";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function HomePage() {
  const { handleToggleFavorite} = useHome();

  const {user} = useAuthStore();
  console.log(user);
  
  const sessions = useSessions();
  const favorites = useFavorites();  
  console.log("\nSession\n", sessions);
  console.log("\nfavorites\n", favorites);

  return (
    <Section>
      <Hello />
      <img src="/img/Hero.png" alt="hero" className="w-full" />

      <Content>
        <Section>
          <h3 className="mb-4">Les recommandations</h3>
          <div className="flex flex-wrap gap-6">
            {sessions.map((session) => (
              <FavoriteSessionCard
                key={session._id}
                id={session._id}
                trainingTitle={session.training.title}
                trainingImage={session.coverImage}
                session={session}
                isFavorite={favorites.includes(session._id)}
                onToggleFavorite={() => handleToggleFavorite(session._id)}
              />
            ))}
          </div>
        </Section>
      </Content>
    </Section>
  );
}
