import { api } from "@/shared/lib/axios";

export const createTraining = (payload) => {
  return api.post("/formations?folderType=formation", payload);
};
