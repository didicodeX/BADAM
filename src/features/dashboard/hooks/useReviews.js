import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as ReviewAPI from "../api/review.api";
import { socket } from "@/shared/lib/socket"; // Importer le socket

export default function useReviews(trainingId) {
  // Récupère les reviews de cette session (par exemple avec useQuery)
  
  const myReviewsQuery = useQuery({
    queryKey: ["reviews", trainingId],  // Key unique pour chaque formation
    queryFn: () => ReviewAPI.getReviews(trainingId),  // Supposons que tu aies cette fonction
    enabled: !!trainingId, // ✅ ne s'exécute que si trainingId est défini
  });

  // Mutation pour créer une review
  const createReviewMutation = useMutation({
    mutationFn: ({ trainingId, ...payload }) =>
      ReviewAPI.createReview(trainingId, payload),
    onSuccess: () => {
      myReviewsQuery.refetch(); // Requête pour mettre à jour les reviews après l’ajout
    },
  });

  // Écouter l'événement `review_posted` du backend (via Socket.io)
  useEffect(() => {
    const handleNewReview = (newReview) => {
      // On vérifie que la review appartient à la session courante
      if (newReview.training._id === trainingId) {
        // Ajout dynamique de la nouvelle review à la liste existante
        myReviewsQuery.refetch(); // Cette ligne permet de rafraîchir la liste des reviews
      }
    };

    socket.on("review_posted", handleNewReview); // On écoute l'événement

    // Cleanup
    return () => {
      socket.off("review_posted", handleNewReview);
    };
  }, [trainingId, myReviewsQuery]);

  return {
    createReview: createReviewMutation.mutate,
    reviews: myReviewsQuery.data?.data || [], // Reviews de la session
    isLoadingReviews: myReviewsQuery.isLoading, // Loading state pour les reviews
  };
}
