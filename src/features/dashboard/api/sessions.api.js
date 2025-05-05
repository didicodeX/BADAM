import { api } from "@/shared/lib/axios";

export const getMyRegistrations = () => {
  return api.get("/registrations"); // session suivies
};

export const getMySessions = () => {
  return api.get("/sessions/me");
};

export const getSessionsByTraining = (trainingId) => {
  return api.get(`/session/training/${trainingId}`)
}

export const getMySessionsWithCount = () => {
  return api.get("/sessions/mine/with-registrations");
};


export const getMySession = (id) => {
  return api.get(`/sessions/${id}`); 
};

export const createSession = (trainingId, payload) => {
  return api.post(`/sessions/${trainingId}`, payload);
};


export const deleteSession = (id) => {
  return api.delete(`/sessions/${id}`)
}