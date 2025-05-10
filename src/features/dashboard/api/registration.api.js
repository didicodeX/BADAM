import { api } from "@/shared/lib/axios";

export const getMyRegistrations = () => {
  return api.get("/registrations");
};

export const getParticipantsBySession = (sessionId) => {
  return api.get(`/registrations/sessions/${sessionId}`);
};

export const createRegistration = (sessionId) => {
  return api.post(`/registrations/${sessionId}`);
};

export const deleteRegistration = (sessionId) => {
  return api.delete(`/registrations/${sessionId}`);
};

export const deleteRegistrationByInstructor = (sessionId, userId) =>
  api.delete(`/registrations/${sessionId}?userId=${userId}`);
