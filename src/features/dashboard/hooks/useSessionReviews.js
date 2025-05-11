import { useQuery } from "@tanstack/react-query";
import * as ReviewAPI from "../api/review.api";

export default function useSessionReviews(sessionId) {
  const query = useQuery({
    queryKey: ["reviews", "session", sessionId],
    queryFn: () => ReviewAPI.getReviewsBySession(sessionId),
    enabled: !!sessionId,
  });

  const reviews = query.data?.data || [];

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return {
    reviews,
    averageRating,
    isLoadingReviews: query.isLoading,
  };
}
