import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useTraining } from "../hooks/useTrainings";
import TrainingBreadcrumb from "../components/TrainingBreadcrumb";
import ScrollToTop from "@/shared/components/ScrollToTop";

export default function TrainingLayout() {
  const { id } = useParams();
  const { training } = useTraining(id);
 
  return (
    <div>
      <ScrollToTop />
      <TrainingBreadcrumb training={training} />
      <Outlet />
    </div>
  );
}

