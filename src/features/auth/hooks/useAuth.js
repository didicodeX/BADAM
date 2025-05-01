import { useMutation } from "@tanstack/react-query";
import * as AuthAPI from "@/features/auth/api/auth.api";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from "@/shared/lib/toast.jsx";

export function useAuth() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const loginMutation = useMutation({
    mutationFn: AuthAPI.login,
    onSuccess: ({ data }) => {
      setUser(data.user);
      toastSuccess(data.message);
      navigate("/home");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Erreur inconnue";
      toastError(message);
    },
  });

  const signupMutation = useMutation({
    mutationFn: AuthAPI.register,
    onSuccess: ({ data }) => {
      setUser(data.user);
      toastSuccess(data.message);
      navigate("/login");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Erreur inconnue";
      toastError(message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: AuthAPI.logout,
    onSuccess: ({ data }) => {
      setUser(null);
      toastSuccess(data.message);
      navigate("/login");
    },
    onError: ({ data }) => {
      toastError(data.message);
    },
  });

  return {
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}
