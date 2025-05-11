import { api } from "@/shared/lib/axios";

export const createReview = (trainingId,payload) => {
  return api.post(`/reviews/${trainingId}`, payload);
};

export const getMyReviews = () => {
  return api.get("/reviews/");
}

export const getReviews = (trainingId) => {
  return api.get(`/reviews/${trainingId}`);
};

export const getReviewsBySession = (sessionId) =>
  api.get(`/sessions/${sessionId}/reviews`);


