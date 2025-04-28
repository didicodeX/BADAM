import { useAuthStore } from "@/features/auth/store/auth.store"

export default function HomePage(){
  const {user} = useAuthStore();
  console.log(user);
  
  return <>
  <h1>Home Page</h1>
  <img src={user.avatar} alt="" />
  </>
}