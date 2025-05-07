import { useState } from "react";
import { Search } from "lucide-react";
import Section from "@/shared/components/Section";
import useFavorites from "../../hooks/useFavorites";
import { useFavoritetore } from "../../store/favorite.store";
import Content from "@/shared/components/Content";
import FavoriteSessionCard from "@/features/home/components/FavoriteSessionCard";

export default function FavoritesPage() {
  const { handleToggleFavorite } = useFavorites();
  const [isFocused, setIsFocused] = useState(false);
  const favorites = useFavoritetore((state) => state.favorites);

  console.log(favorites);

  return (
    <Content>
      <h2 className="mb-4">Mes favoris</h2>
      <Section>
        <div className="py-4 flex justify-center">
          <div
            className={`flex items-center justify-between border rounded-full focus:border-cta-500 px-6 py-3 w-full max-w-[500px] ${
              isFocused ? "border-cta-500" : "border-text-200"
            }`}
          >
            <input
              type="search"
              placeholder="Rechercher une formation..."
              className="w-full  text-sm outline-none focus:outline-none"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <Search className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          {favorites.map((session) => (
            <FavoriteSessionCard
              key={session._id}
              id={session._id}
              trainingTitle={session.training?.title || ""}
              trainingImage={session.coverImage}
              session={session}
              isFavorite={favorites.some((s) => s._id === session._id)}
              onToggleFavorite={() => handleToggleFavorite(session)}
            />
          ))}
        </div>
      </Section>
    </Content>
  );
}
