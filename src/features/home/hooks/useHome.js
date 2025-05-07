import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as HomeAPI from "../api/home.api";
import { useHomeStore } from "../store/useHome.store";
import { useEffect } from "react";
import { toastError } from "@/shared/components/toast";

export default function useHome() {
  const queryClient = useQueryClient();

  const { setSessions, setFavorites, favorites, toggleFavorite } =
    useHomeStore();

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [sessionRes, favoriteRes] = await Promise.all([
          HomeAPI.getAllSessions(),
          HomeAPI.getFavorites(), // ← nouvelle API à appeler
        ]);
        setSessions(sessionRes.data);
        console.log("favoriteRes : \n", favoriteRes.data);

        setFavorites(favoriteRes.data.map((fav) => fav.session._id));
      } catch (err) {
        toastError("Erreur lors du chargement des données.");
        console.log(err.message);
      }
    }

    fetchInitialData();
  }, [setSessions, setFavorites]);

  const addFavoriteMutation = useMutation({
    mutationFn: HomeAPI.addFavorite,
    onSuccess: (_, sessionId) => {
      toggleFavorite(sessionId);
      queryClient.invalidateQueries(["sessions-home"]);
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: HomeAPI.removeFavorite,
    onSuccess: (_, sessionId) => {
      toggleFavorite(sessionId);
      queryClient.invalidateQueries(["sessions-home"]);
    },
  });

  const handleToggleFavorite = (sessionId) => {
    if (favorites.includes(sessionId)) {
      removeFavoriteMutation.mutate(sessionId);
    } else {
      addFavoriteMutation.mutate(sessionId);
    }
  };

  return {
    handleToggleFavorite,
    // isLoadingSessions: getAllSessionsQuery.isLoading,
    // isErrorSessions: getAllSessionsQuery.isError,
  };
}
