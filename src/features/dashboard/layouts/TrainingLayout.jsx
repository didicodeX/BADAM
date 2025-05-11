import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useTraining } from "../hooks/useTrainings";
import TrainingBreadcrumb from "../components/TrainingBreadcrumb";

export default function TrainingLayout() {
  const { id } = useParams();
  const { training } = useTraining(id);
 

  return (
    <>
      <TrainingBreadcrumb training={training} />
      <Outlet />
    </>
  );
}
