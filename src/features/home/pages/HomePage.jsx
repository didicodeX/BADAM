import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import AuthDebug from "@/shared/components/AuthDebug";
import Hello from "../components/Hello";
import { getAllSessions } from "../api/home.api";


export default function HomePage() {
  const { user } = useAuthStore();
  console.log(user);
  useEffect(()=>{
    async function fetchSession() {
      try {
        const response = await getAllSessions();
        console.log(response);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchSession();
  })
  return (
    <div className="padd-y flex flex-col gap-6">
      <Hello/>
      <img src="/img/Hero.png" alt="" />
      <AuthDebug />
    </div>
  );
}
