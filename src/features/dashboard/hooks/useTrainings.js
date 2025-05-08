import { useMutation, useQuery } from "@tanstack/react-query";
import * as TrainingAPI from "@/features/dashboard/api/trainings.api";
import { useTrainingStore } from "../store/training.store";
import { useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from "@/shared/components/toast";

export function useTraining(id) {
  const navigate = useNavigate();
  const setTraining = useTrainingStore((state) => state.setTraining);

  const createTrainingMutation = useMutation({
    mutationFn: TrainingAPI.createTraining,
    onSuccess: ({ data }) => {
      toastSuccess(data.message);
      navigate("/dashboard/trainings/created");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Erreur inconnue";
      toastError(message);
    },
  });

  const updateTrainingMutation = useMutation({
    mutationFn: ({ id, updatedData }) =>
      TrainingAPI.updateTraining(id, updatedData),
    onSuccess: ({ data }) => {
      toastSuccess(data.message);
      navigate(`/dashboard/trainings/${data.training._id}`);
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Erreur inconnue";
      toastError(message);
    },
  });

  const deleteTrainingMutation = useMutation({
    mutationFn: TrainingAPI.deleteTraining,
    onSuccess: ({ data }) => {
      toastSuccess(data.message);
      myTrainingsQuery.refetch();
      navigate("/dashboard/trainings/created");
    },
  });

  const myTrainingsQuery = useQuery({
    queryKey: ["my-trainings"],
    queryFn: TrainingAPI.getMyTrainings,
  });

  const myTrainingQuery = useQuery({
    queryKey: ["my-training", id],
    queryFn: () => TrainingAPI.getMyTraining(id),
    onSuccess: (data) => {
      setTraining(data.data); // ← ici tu stockes le training
    },
    enabled: !!id,
  });

  return {
    createTraining: createTrainingMutation.mutate,
    myTrainings: myTrainingsQuery.data?.data || [],
    isLoadingMyTrainings: myTrainingsQuery.isLoading,
    isErrorMyTrainings: myTrainingsQuery.isError,
    deleteTraining: deleteTrainingMutation.mutate,
    updateTraining: updateTrainingMutation.mutate,
    training: myTrainingQuery.data?.data,
    isLoadingTraining: myTrainingQuery.isLoading,
    isErrorTraining: myTrainingQuery.isError,
  };
}
