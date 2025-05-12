import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function ProtectedRoute() {
  const { user, isInitialized } = useAuthStore();

  if (!isInitialized) {
    return null; // Tant que ce n'est pas initialisé, ne rien afficher
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
