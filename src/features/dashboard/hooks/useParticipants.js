import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as API from "../api/registration.api";

export default function useParticipants(sessionId) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["participants", sessionId],
    queryFn: () => API.getParticipantsBySession(sessionId),
    enabled: !!sessionId,
  });

  const remove = useMutation({
    mutationFn: ({ sessionId, userId }) =>
      API.deleteRegistrationByInstructor(sessionId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["participants", sessionId]);
    },
  });

  return {
    participants: query.data?.data || [],
    isLoading: query.isLoading,
    removeParticipant: remove.mutate,
  };
}
