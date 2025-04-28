import { api } from "@/shared/lib/axios";

export const login = (payload) => {
  return api.post("/auth/login", payload);
};

export const register = (payload) => {
  return api.post("/auth/register", payload);
};

export const logout = () => {
  return api.post("/auth/logout");
};

export const me = () => {
  return api.get("/auth/me");
};