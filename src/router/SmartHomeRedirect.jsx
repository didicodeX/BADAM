import { Navigate } from "react-router-dom";
import  {useAuthStore}  from "@/features/auth/store/auth.store";

export default function SmartHomeRedirect() {
  const { user, isInitialized } = useAuthStore();

  if (!isInitialized) {
    return null; 
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <Navigate to="/landing" replace />;
}
