import { create } from "zustand";
import { searchSessions } from "../api/search.api";
import { debounce } from "lodash";

export const useSearchStore = create((set) => ({
  query: "",
  results: [],
  loading: false,
  error: null,

  setQuery: (query) => {
    set(() => ({ query }));
    useSearchStore.getState().fetchResults(query);
  },

  fetchResults: debounce(async (query) => {
    if (!query.trim()) {
      set(() => ({ results: [], loading: false, error: null }));
      return;
    }

    set(() => ({ loading: true, error: null }));
    try {
      const { data } = await searchSessions(query);
      set(() => ({ results: data || [], loading: false }));
    } catch (err) {
      set(() => ({
        results: [],
        error: err.response?.data?.message || "Erreur",
        loading: false,
      }));
    }
  }, 300),
}));
