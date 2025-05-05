import { useParams } from "react-router-dom";

export default function EditSessionPage() {
  const { id } = useParams();
  console.log(id);
  
  return <>
  <h1>EditSessionPage</h1>
  </>;
}
