import { useMutation } from "@tanstack/react-query";
import * as ProfileAPI from "@/features/profile/api/profile.api";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from "@/shared/lib/toast";

export function useProfile() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const updateProfileMutation = useMutation({
    mutationFn: ProfileAPI.updateUser,
    onSuccess: ({ data }) => {
      setUser(data.user);
      toastSuccess(data.message);
      navigate("/profile");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Erreur inconnue";
      toastError(message);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: ProfileAPI.deleteUser,
    onSuccess: ({ data }) => {
      setUser(null);
      toastSuccess(data.message);
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Erreur inconnue";
      toastError(message);
    },
  });

  return {
    updateProfile: updateProfileMutation.mutate,
    deleteUser: deleteUserMutation.mutate
  };
}
