import { useAuthStore } from "@/features/auth/store/auth.store";
import AuthDebug from "@/shared/components/AuthDebug";
import Hello from "../components/Hello";

export default function HomePage() {
  const { user } = useAuthStore();
  console.log(user);

  return (
    <div className="py-6 flex flex-col gap-6">
      <Hello/>
      <img src="/img/Hero.png" alt="" />
      <AuthDebug />
    </div>
  );
}
