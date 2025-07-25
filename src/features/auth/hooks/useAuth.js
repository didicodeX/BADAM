import { useMutation } from "@tanstack/react-query";
import * as AuthAPI from "@/features/auth/api/auth.api";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import {  toastError } from "@/shared/components/toast.jsx";

export function useAuth() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user); 

  const isAuthenticated = !!user; 

  const loginMutation = useMutation({
    mutationFn: AuthAPI.login,
    onSuccess: ({ data }) => {
      setUser(data.user);
      navigate("/home");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Erreur inconnue";
      toastError(message);
    },
  });

  const signupMutation = useMutation({
    mutationFn: AuthAPI.register,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Erreur inconnue";
      toastError(message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: AuthAPI.logout,
    onSuccess: () => {
      setUser(null);
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
    user,
    isAuthenticated,
  };
}
