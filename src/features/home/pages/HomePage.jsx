import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/features/auth/store/auth.store";
import Button from "@/shared/components/Button";

export default function HomePage() {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout(); 
  };
  return (
    <>
      <h1>Home Page</h1>
      <img src={user.avatar} alt="" />
      <Button onClick={handleLogout}>deconnexion</Button>
    </>
  );
}
