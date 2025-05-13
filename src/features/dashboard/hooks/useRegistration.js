import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as RegistrationAPI from "../api/registration.api";
import { toastSuccess, toastError } from "@/shared/components/toast";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function useRegistration() {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const followedSessionQuery = useQuery({
    queryKey: ["followedSession"],
    queryFn: RegistrationAPI.getMyRegistrations,
    enabled: isAuthenticated,
  });

  const archivedSessionQuery = useQuery({
    queryKey: ["archivedSession"],
    queryFn: RegistrationAPI.getArchivedRegistrations,
    enabled: isAuthenticated,
  });

  const createRegistrationMutation = useMutation({
    mutationFn: (sessionId) => RegistrationAPI.createRegistration(sessionId),

    onSuccess: ({ data }) => {
      toastSuccess(data.message);
      navigate("/dashboard/sessions", {
        state: { tab: "followed" },
      });
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
    archivedSessions: archivedSessionQuery.data?.data || [],
    isLoadingArchivedSession: archivedSessionQuery.isLoading,
    registerToSession: createRegistrationMutation.mutate,
    unfollowSession: deleteRegistrationMutation.mutate,
  };
}
