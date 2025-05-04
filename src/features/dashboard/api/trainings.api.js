import { api } from "@/shared/lib/axios";

export const createTraining = (payload) => {
  return api.post("/trainings?folderType=training", payload);
};

export const getMyTraining = ()=>{
  return api.get("/trainings/me");
}

export const deleteTraining = (id) => {
  return api.delete(`/trainings/${id}`);
};