import { api } from "@/shared/lib/axios";

export const createTraining = (payload) => {
  return api.post("/trainings?folderType=training", payload);
};

export const getMyTrainings = () => {
  return api.get("/trainings/me");
};

export const getMyTraining = (id) => {
  return api.get(`/trainings/${id}`);
};

export const updateTraining = (id,updatedData) => {
  return api.patch(`/trainings/${id}`,updatedData);
};

export const deleteTraining = (id) => {
  return api.delete(`/trainings/${id}`);
};
