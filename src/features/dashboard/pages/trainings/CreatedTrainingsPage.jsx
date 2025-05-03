import { useEffect } from "react";
import { getMyTraining } from "../../api/training.api";

export default function CreatedTrainingsPage() {
  useEffect(() => {
    async function fetchMyTraining() {
      try {
        const response = await getMyTraining();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMyTraining();
  });
  return (
    <>
      <h1>Mes formations créées</h1>
    </>
  );
}
