import { useSessions } from "@/features/home/store/useHome.store";
import CreateSessionPage from "@/features/dashboard/pages/sessions/CreateSessionPage";

export default function TestPage() {
  const sessions = useSessions();  
  console.log("\nSession\n", sessions);
  return (
    <div>
      <CreateSessionPage />
    </div>
  );
}
