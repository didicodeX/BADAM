import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import * as HomeAPI from "../api/home.api";
import { useHomeStore } from "../store/useHome.store";
import { useEffect } from "react";

export default function useHome(id) {
  const queryClient = useQueryClient();

  const { setSessions, setFavorites, favorites, toggleFavorite } =
    useHomeStore();

  const allSessionsQuery = useQuery({
    queryKey: ["all-sessions"],
    queryFn: HomeAPI.getAllSessions,
  });

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [sessionRes, favoriteRes] = await Promise.all([
          HomeAPI.getAllSessions(),
          HomeAPI.getFavorites(), // ← nouvelle API à appeler
        ]);
        setSessions(sessionRes.data);

        setFavorites(favoriteRes.data.map((fav) => fav.session._id));
      } catch (err) {
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

  const topRatedQuery = useQuery({
    queryKey: ["top-rated"],
    queryFn: HomeAPI.getTopRatedSessions
  })

  const latestQuery = useQuery({
    queryKey: ["latest"],
    queryFn: HomeAPI.getLatestSessions,
  });

  const sessionDetailQuery = useQuery({
    queryKey: ["sesionDetail",id],
    queryFn: () => HomeAPI.getSessionsDetail(id),
    enabled: !!id,
  });

  return {
    handleToggleFavorite,
    // isLoadingSessions: getAllSessionsQuery.isLoading,
    // isErrorSessions: getAllSessionsQuery.isError,

    topRated: topRatedQuery.data?.data || [],
    isLoadingtopRated: topRatedQuery.isLoading,

    allSessions: allSessionsQuery.data?.data || [],
    isLoadingAllSession: allSessionsQuery.isLoading,

    latest: latestQuery.data?.data || [],
    isLoadinglatest: latestQuery.isLoading,

    sessionDetail: sessionDetailQuery.data?.data || [],
    isLoadingsessionDetail: sessionDetailQuery.isLoading,
  };
}
