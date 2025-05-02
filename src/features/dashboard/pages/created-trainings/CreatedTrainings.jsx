import { useTrainingStore } from "../../store/training.store";

export default function CreatedTrainings() {
  const {training} = useTrainingStore()
  console.log(training);
  
  return (
    <>
      <h1>Mes formations créées</h1>
    </>
  );
}
