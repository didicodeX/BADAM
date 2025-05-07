import { create } from "zustand";

// Le store principal
export const useFavoritetore = create((set) => ({
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
export const useSessions = () => useFavoritetore((state) => state.sessions);
export const useFavorites = () => useFavoritetore((state) => state.favorites);
export const useToggleFavorite = () =>
  useFavoritetore((state) => state.toggleFavorite);
export const useSetSessions = () =>
  useFavoritetore((state) => state.setSessions);
