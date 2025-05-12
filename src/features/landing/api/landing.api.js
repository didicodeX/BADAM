import { api } from "@/shared/lib/axios";

export const getAllSessions = () => {
  return api.get("/sessions");
};
