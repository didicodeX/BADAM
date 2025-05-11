import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useTraining } from "../hooks/useTrainings";
import TrainingBreadcrumb from "../components/TrainingBreadcrumb";

export default function TrainingLayout() {
  const { id } = useParams();
  const { training } = useTraining(id);
 
  return (
    <div className="px-4 md:px-6 pt-4">
      <TrainingBreadcrumb training={training} />
      <Outlet />
    </div>
  );
}

