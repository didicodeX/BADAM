import { Navigate } from "react-router-dom";
import  {useAuthStore}  from "@/features/auth/store/auth.store";

export default function SmartHomeRedirect() {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <Navigate to="/landing" replace />;
}
