import { useMutation, useQuery } from "@tanstack/react-query";
import * as TrainingAPI from "@/features/dashboard/api/trainings.api";
import { useTrainingStore } from "../store/training.store";
import { useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from "@/shared/lib/toast";

export function useTraining() {
  const navigate = useNavigate();
  const setTraining = useTrainingStore((state) => state.setTraining);

  const createTrainingMutation = useMutation({
    mutationFn: TrainingAPI.createTraining,
    onSuccess: ({ data }) => {
      console.log(data);
      setTraining(data);
      toastSuccess("Formation créée avec succès !");
      navigate("/dashboard/created-trainings");
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
    },
  });

  const myTrainingsQuery = useQuery({
    queryKey: ["my-trainings"],
    queryFn: TrainingAPI.getMyTraining,
  });

  return {
    createTraining: createTrainingMutation.mutate,
    myTrainings: myTrainingsQuery.data?.data || [],
    isLoadingMyTrainings: myTrainingsQuery.isLoading,
    isErrorMyTrainings: myTrainingsQuery.isError,
    deleteTraining: deleteTrainingMutation.mutate,
  };
}
