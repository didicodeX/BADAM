import { useState } from "react";
import LoadingScreen from "@/shared/components/LoadingScreen";
import { useTraining } from "../../hooks/useTrainings";
import TrainingCard from "../../components/TrainingCard";
import { Search } from "lucide-react";

export default function CreatedTrainingsPage() {
  const [isFocused, setIsFocused] = useState(false);
  const { myTrainings, isLoadingMyTrainings } = useTraining();
  if (isLoadingMyTrainings) return <LoadingScreen />;
  console.log(myTrainings);

  return (
    <div className="padd-x padd-y flex flex-col gap-6 md:gap-10">
      <h2>Mes formations créées</h2>
      <div className="flex flex-col gap-8">
        <div className="py-4 flex justify-center">
          <div
            className={`flex items-center justify-between border rounded-full focus:border-cta-500 px-6 py-3 w-full max-w-[500px] ${
              isFocused ? "border-cta-500" : "border-text-200"
            }`}
          >
            <input
              type="search"
              placeholder="Rechercher une formation..."
              className="bg-transparent text-sm outline-none focus:outline-none "
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <Search className="w-5 h-5" />
          </div>
        </div>
        <div className="flex gap-6 flex-wrap">
          {myTrainings.map((training) => (
            <TrainingCard
              key={training._id}
              id={training._id}
              title={training.title}
              description={training.description}
              imageUrl={training.images[0]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
