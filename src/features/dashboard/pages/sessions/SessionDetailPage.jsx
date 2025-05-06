import { useParams } from "react-router-dom";
import { useSession } from "../../hooks/useSessions";

export default function SessionDetailPage() {
  const {id}  = useParams()
  const {mySessionDetail} = useSession(id);

  console.log(mySessionDetail);
  
  return <>
  <h1>SessionDetailPage</h1>
  </>;
}
