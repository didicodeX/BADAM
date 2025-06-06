import { useMutation, useQuery } from "@tanstack/react-query";
import * as SessionAPI from "../api/sessions.api";
import { useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from "@/shared/components/toast";
import { useSessionStore } from "../store/session.store";

export function useSession(id, trainingId) {
  const navigate = useNavigate();
  const setSession = useSessionStore((state) => state.setSession);

  const createSessionMutation = useMutation({
    mutationFn: ({ trainingId, ...payload }) =>
      SessionAPI.createSession(trainingId, payload),
    onSuccess: ({ data }) => {
      setSession(data);
      toastSuccess("Session créée avec succès !");
      navigate("/dashboard/sessions", {
        state: { tab: "created" },
      });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Erreur inconnue";
      toastError(message);
    },
  });

  const mySessionsQuery = useQuery({
    queryKey: ["my-sessions"],
    queryFn: SessionAPI.getMySessionsWithCount,
  });

  const mySessionsByTrainingQuery = useQuery({
    queryKey: ["my-session-by-training", trainingId],
    queryFn: () => SessionAPI.getSessionsByTraining(trainingId),
    enabled: !!trainingId,
  });

  const mySessionQuery = useQuery({
    queryKey: ["my-session"],
    queryFn: () => SessionAPI.getMySession(id),
    enabled: !!id,
  });

  const mySessionDetailsQuery = useQuery({
    queryKey: ["my-session-details"],
    queryFn: () => SessionAPI.getMySessionDetails(id),
    enabled: !!id,
  });

  const sessionDetailsQuery = useQuery({
    queryKey: ["my-session-details"],
    queryFn: () => SessionAPI.getSessionDetails(id),
    enabled: !!id,
  });

  const updateSessionMutation = useMutation({
    mutationFn: ({ id, updatedData }) =>
      SessionAPI.updateSession(id, updatedData),
    onSuccess: ({ data }) => {
      toastSuccess(data.message);
      navigate(`/dashboard/sessions/${data.session._id}`);
    },
  });

  const deleteSessionMutation = useMutation({
    mutationFn: SessionAPI.deleteSession,
    onSuccess: ({ data }) => {
      toastSuccess(data.message);
      mySessionsQuery.refetch();
      navigate("/dashboard/sessions");
    },
  });

  return {
    createSession: createSessionMutation.mutate,
    mySession: mySessionQuery.data?.data,
    isLoadingSession: mySessionQuery.isLoading,
    isErrorSession: mySessionQuery.isError,
    mySessions: mySessionsQuery.data?.data || [],
    isLoadingSessions: mySessionsQuery.isLoading,
    isErrorSessions: mySessionsQuery.isError,
    mySessionsByTraining: mySessionsByTrainingQuery.data?.data || [],
    isLoadingSessionsByTraining: mySessionsByTrainingQuery.isLoading,
    isErrorSessionsByTraining: mySessionsByTrainingQuery.isError,
    mySessionDetail: mySessionDetailsQuery.data?.data || [],
    isLoadingMySessionDetail: mySessionDetailsQuery.isLoading,
    sessionDetails: sessionDetailsQuery.data?.data || [],
    isLoadingSessionDetails: sessionDetailsQuery.isLoading,
    updateSession: updateSessionMutation.mutate,
    deleteSession: deleteSessionMutation.mutate,
  };
}
