import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSession } from "../hooks/useSessions";
import SessionBreadcrumb from "../components/SessionBreadcrumb";

export default function SessionLayout() {
  const { id } = useParams();
  const { mySession: session } = useSession(id);

  return (
    <>
      <SessionBreadcrumb session={session} />
      <Outlet />
    </>
  );
}
