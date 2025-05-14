// features/search/pages/SearchPage.jsx
import { useSearchStore } from "../store/search.store";
import { useAuthStore } from "@/features/auth/store/auth.store";
import CardListContainer from "@/shared/components/CardListContainer";
import SessionCard from "@/features/dashboard/components/SessionCard";
import FavoriteCard from "@/features/home/components/FavoriteCard";
import useHome from "@/features/home/hooks/useHome";
import Content from "@/shared/components/Content";
import { useFavorites } from "@/features/home/store/useHome.store";

export default function SearchPage() {
  const { results, loading, error, query } = useSearchStore();
  const { user } = useAuthStore();
  const { handleToggleFavorite } = useHome();
  const  favorites  = useFavorites();
  // const favorites = user?.favorites || [];

  if (!query.trim()) return null;

  return (
    <Content>
      <div>
        <h2 className="text-xl font-bold mb-4">Résultats de recherche</h2>
        {loading && <p>Chargement...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {results.length > 0 && (
          <p className="text-sm text-text-700 mb-4">
            {results.length} session{results.length > 1 ? "s" : ""} trouvée{results.length > 1 ? "s" : ""} pour "<strong>{query}</strong>"
          </p>
        )}
      </div>

      <CardListContainer>
        {results.map((session) => {
          const isOwner = session.createdBy === user?._id;
          return isOwner ? (
            <SessionCard
              key={session._id}
              id={session._id}
              trainingTitle={session.training.title}
              trainingImage={session.coverImage || session.training.images[0]}
              session={session}
            />
          ) : (
            <FavoriteCard
              key={session._id}
              id={session._id}
              trainingTitle={session.training.title}
              trainingImage={session.coverImage || session.training.images[0]}
              session={session}
              isFavorite={favorites.includes(session._id)}
              onToggleFavorite={() => handleToggleFavorite(session._id)}
            />
          );
        })}
      </CardListContainer>
    </Content>
  );
}
