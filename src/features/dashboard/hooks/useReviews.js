import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as ReviewAPI from "../api/review.api";
import { toastSuccess } from "@/shared/components/toast";

export default function useReviews() {
  const queryClient = useQueryClient();
  const myReviewsQuery = useQuery({
    queryKey: ["my-reviews"],
    queryFn: ReviewAPI.getMyReviews,
  });

  const createReviewMutation = useMutation({
    mutationFn: ({ trainingId, ...payload }) =>
      ReviewAPI.createReview(trainingId, payload),
    onSuccess: ({ data }) => {
      toastSuccess(data.message);
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
      myReviewsQuery.refetch();
    },
  });

  return {
    createReview: createReviewMutation.mutate,
    myReviews: myReviewsQuery.data?.data || [],
    isLoadingMyReviews: myReviewsQuery.isLoading,
    isFetchingMyReviews: myReviewsQuery.isFetching,
  };
}
