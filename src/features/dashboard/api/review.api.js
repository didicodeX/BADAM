import { api } from "@/shared/lib/axios";

export const createReview = (trainingId,payload) => {
  return api.post(`/reviews/${trainingId}`, payload);
};

export const getMyReviews = () => {
  return api.get("/reviews/");
}

// ✅ Fonction pour récupérer toutes les reviews d'une formation
export const getReviews = (trainingId) => {
  return api.get(`/reviews/${trainingId}`);
};