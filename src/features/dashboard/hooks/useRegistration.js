import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as RegistrationAPI from "../api/registration.api";
import { toastSuccess, toastError } from "@/shared/components/toast";

export default function useRegistration() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const followedSessionQuery = useQuery({
    queryKey: ["followedSession"],
    queryFn: RegistrationAPI.getMyRegistrations,
  });

  const createRegistrationMutation = useMutation({
    mutationFn: (sessionId) => RegistrationAPI.createRegistration(sessionId),

    onSuccess: ({ data }) => {
      toastSuccess(data.message);
      navigate("/dashboard/sessions/followed");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Erreur inconnue";
      toastError(message);
    },
  });


  const deleteRegistrationMutation = useMutation({
    mutationFn: RegistrationAPI.deleteRegistration,
    onSuccess: ({ data }) => {
      toastSuccess(data.message);
      queryClient.invalidateQueries(["followedSession"]);
    },
    onError: () => {
      toastError("Impossible de se désinscrire pour le moment.");
    },
  });

  return {
    followedSessions: followedSessionQuery.data?.data || [],
    isLoadingFollowedSession: followedSessionQuery.isLoading,
    registerToSession: createRegistrationMutation.mutate,
    unfollowSession: deleteRegistrationMutation.mutate,
  };
}
