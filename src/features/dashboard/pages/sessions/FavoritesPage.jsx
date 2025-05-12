import Section from "@/shared/components/Section";
import useFavorites from "../../hooks/useFavorites";
import { useFavoriteStore } from "../../store/favorite.store";
import FavoriteCard from "@/features/home/components/FavoriteCard";
import Button from "@/shared/components/Button";
import CardListContainer from "@/shared/components/CardListContainer";

export default function FavoritesPage() {
  const { handleToggleFavorite } = useFavorites();
  const favorites = useFavoriteStore((state) => state.favorites);

  return (
    <Section last>
        <h3>Mes favoris</h3>
        <CardListContainer>
          {favorites.map((session) => (
            <FavoriteCard
              key={session._id}
              id={session._id}
              trainingTitle={session.training?.title || ""}
              trainingImage={session.coverImage || session.training.images[0]}
              session={session}
              isFavorite={favorites.some((s) => s._id === session._id)}
              onToggleFavorite={() => handleToggleFavorite(session)}
            />
          ))}
        </CardListContainer>
        {favorites.length === 0 && (
          <div className="flex flex-col items-center gap-6">
            <p className="text-center text-text-500 mt-8">
              Aucune session favorite pour le moment.
            </p>
            <Button to={"/"}>Ajouter une session</Button>
          </div>
        )}
      </Section>
  );
}
