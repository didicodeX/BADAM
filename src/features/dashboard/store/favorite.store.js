import { create } from "zustand";

// Le store principal
export const useFavoriteStore = create((set) => ({
  sessions: [],
  favorites: [],
  setSessions: (sessions) => set({ sessions }),
  setFavorites: (favorites) => set({ favorites }), // ← AJOUTÉ
  toggleFavorite: (sessionId) =>
    set((state) => {
      const alreadyFavorite = state.favorites.includes(sessionId);
      return {
        favorites: alreadyFavorite
          ? state.favorites.filter((id) => id !== sessionId)
          : [...state.favorites, sessionId],
      };
    }),
  
}));

// 🔁 Hooks selectors : à utiliser dans les composants
export const useSessions = () => useFavoriteStore((state) => state.sessions);
export const useFavorites = () => useFavoriteStore((state) => state.favorites);
export const useToggleFavorite = () =>
  useFavoriteStore((state) => state.toggleFavorite);
export const useSetSessions = () =>
  useFavoriteStore((state) => state.setSessions);
