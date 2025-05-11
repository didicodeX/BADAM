import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSession } from "../hooks/useSessions";
import SessionBreadcrumb from "../components/SessionBreadcrumb";


export default function SessionLayout() {
  const { id } = useParams();
  const { mySessionDetail } = useSession(id);
  const session = mySessionDetail?.session;
  

  return (
    <div className="px-4 md:px-6 pt-4">
      <SessionBreadcrumb session={session} />
      <Outlet />
    </div>
  );
}
