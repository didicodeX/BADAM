import { api } from "@/shared/lib/axios";

export const getMyRegistrations = () => {
  return api.get("/registrations");
};

export const createRegistration = (sessionId) => {
  return api.post(`/registrations/${sessionId}`);
};

export const deleteRegistration = (sessionId) => {
  return api.delete(`/registrations/${sessionId}`);
};
