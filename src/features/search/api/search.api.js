import { api } from "@/shared/lib/axios";

export const searchSessions = (query) => {
  return api.get(`/sessions/search?query=${query}`);
};