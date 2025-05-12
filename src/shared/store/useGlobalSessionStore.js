import { create } from "zustand";
import { getAllSessions, getFavorites, addFavorite, removeFavorite } from "../api/home.api";
import { toastError } from "@/shared/components/toast";

export const useGlobalSessionStore = create((set, get) => ({
  sessions: [],
  favorites: [],
  isLoading: false,

  fetchSessions: async () => {
    set({ isLoading: true });
    try {
      const res = await getAllSessions();
      set({ sessions: res.data });
    } catch (err) {
      toastError("Erreur lors du chargement des sessions.", err.message);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFavorites: async () => {
    try {
      const res = await getFavorites();
      const favoriteIds = res.data.map((session) => session._id); // ou res.data si c’est juste un tableau d’ID
      set({ favorites: favoriteIds });
    } catch (err) {
      toastError("Erreur lors du chargement des favoris.", err.message);
    }
  },

  toggleFavorite: async (sessionId) => {
    const { favorites } = get();
    const isFav = favorites.includes(sessionId);
    try {
      if (isFav) {
        await removeFavorite(sessionId);
        set({ favorites: favorites.filter((id) => id !== sessionId) });
      } else {
        await addFavorite(sessionId);
        set({ favorites: [...favorites, sessionId] });
      }
    } catch (err) {
      toastError("Impossible de modifier les favoris.", err.message);
    }
  },
}));
