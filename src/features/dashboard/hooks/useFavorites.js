
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import * as FavoriteAPI from "../api/favorites.api";
import { useFavoritetore } from "../store/favorite.store";

export default function useFavorites() {

  const { setFavorites, favorites } = useFavoritetore();
  useEffect(() => {
    async function getFavorites() {
      try {
        const favoriteRes = await FavoriteAPI.getFavorites();
        console.log(favoriteRes);
        setFavorites(favoriteRes.data.map((fav) => fav.session));
      } catch (error) {
        console.log(error);
      }
    }
    getFavorites();
  }, [setFavorites]);

  const removeFavoriteMutation = useMutation({
    mutationFn: FavoriteAPI.removeFavorite,
    onSuccess: (_, sessionId) => {
      const updatedFavorites = favorites.filter((f) => f._id !== sessionId);
      setFavorites(updatedFavorites);
    },
  });

  const handleToggleFavorite = (sessionId) => {
    // tu peux aussi check ici si tu veux un toggle (add/remove)
    removeFavoriteMutation.mutate(sessionId._id);
  };

  return {
    handleToggleFavorite,
  };
}
