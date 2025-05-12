import Section from "@/shared/components/Section";
import useFavorites from "../../hooks/useFavorites";
import { useFavoriteStore } from "../../store/favorite.store";
import FavoriteCard from "@/features/home/components/FavoriteCard";
import CardListContainer from "@/shared/components/CardListContainer";
import EmptySection from "../../components/EmptySection";
import { Search } from "lucide-react";

export default function FavoritesPage() {
  const { handleToggleFavorite } = useFavorites();
  const favorites = useFavoriteStore((state) => state.favorites);

  return (
    <Section last>
      <h3>Mes séssions favorites</h3>
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
      {favorites.length === 0 && (
        <EmptySection
          title="Aucune séssion en favoris pour le moment."
          link={{
            to: "/",
            label: "Rechercher une séssion",
          }}
          icon={<Search className="w-5 h-5" />}
        />

      )}
      </CardListContainer>
    </Section>
  );
}
