import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import * as FavoriteAPI from "../api/favorites.api";
import { useFavoriteStore } from "../store/favorite.store";

export default function useFavorites() {

  const { setFavorites, favorites } = useFavoriteStore();
  useEffect(() => {
    async function getFavorites() {
      try {
        const favoriteRes = await FavoriteAPI.getFavorites();
        setFavorites(favoriteRes.data.map((fav) => fav.session));
      } catch (error) {
        console.log(error);
      }
    }
    getFavorites();
  }, [setFavorites]);

  const myFavoritesQuery = useQuery({
    queryKey: ["my-favorites"],
    queryFn: FavoriteAPI.getFavorites
  })

  const removeFavoriteMutation = useMutation({
    mutationFn: FavoriteAPI.removeFavorite,
    onSuccess: (_, sessionId) => {
      const updatedFavorites = favorites.filter((f) => f._id !== sessionId);
      setFavorites(updatedFavorites);
    },
  });

  const handleToggleFavorite = (sessionId) => {
    removeFavoriteMutation.mutate(sessionId._id);
  };

  return {
    handleToggleFavorite,
    myFavorites: myFavoritesQuery.data?.data || [],
    isLoadinMyFavorites: myFavoritesQuery.isLoading
  };
}
