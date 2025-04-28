import { useMutation } from "@tanstack/react-query";
import * as AuthAPI from "@/features/auth/services/auth.api";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from "@/shared/lib/toast.jsx";

export function useAuth() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const loginMutation = useMutation({
    mutationFn: AuthAPI.login,
    onSuccess: (data) => {
      setUser(data.user);
      toastSuccess("Connexion réussie !");
      navigate("/test");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Erreur inconnue";
      toastError(message);
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
  };
}
