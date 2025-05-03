import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { getMe } from "@/features/auth/api/auth.api";

export function useInitialUser() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getMe();
        console.log("Réponse de getMe() :", response.data.user);
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
        console.log(error);
      }
    }
    fetchUser();
  }, [setUser]);
}
