import { api } from "@/shared/lib/axios";

export const getAllSessions = () => {
  return api.get("/sessions");
};

export const getFavorites = () => {
  return api.get("/wishlist");
};

export const getSessionsDetail = (id) => {
  return api.get(`/sessions/${id}/details`);
};

export const addFavorite = (sessionId) => {
  return api.post(`/wishlist/${sessionId}`);
};

export const removeFavorite = (sessionId) => {
  return api.delete(`/wishlist/${sessionId}`);
};

export const getTopRatedSessions = () => {
  return api.get("/sessions/top-rated");
};

export const getLatestSessions = () => {
  return api.get("/sessions/latest");
};
