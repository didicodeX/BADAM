import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { getMe } from "@/features/auth/services/auth.api";

export function useInitialUser(){
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getMe();
        setUser(response.data.user)
      }catch(error){
        setUser(null)
        console.log(error)
      }
    }
    fetchUser();
  },[setUser])
}