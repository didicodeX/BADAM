import { Navigate, Outlet } from "react-router-dom";
import {useAuthStore} from "@/features/auth/store/auth.store"

export default function ProtectedRoute() {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
