import { useMutation } from "@tanstack/react-query";
import * as TrainingAPI from "@/features/dashboard/api/training.api";
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

  return {
    createTraining: createTrainingMutation.mutate,
  };
}
