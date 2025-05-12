import { useState } from "react";
import LoadingScreen from "@/shared/components/LoadingScreen";
import { useTraining } from "../../hooks/useTrainings";
import TrainingCard from "../../components/TrainingCard";
import { Search } from "lucide-react";
import Content from "@/shared/components/Content";
import Section from "@/shared/components/Section";
import Button from "@/shared/components/Button";

export default function CreatedTrainingsPage() {
  const [isFocused, setIsFocused] = useState(false);
  const { myTrainings, isLoadingMyTrainings } = useTraining();
  if (isLoadingMyTrainings) return <LoadingScreen />;

  return (
    <Content>
      <h2>Mes formations</h2>
      <Section last>
        <div className="py-4 flex justify-center">
          <div
            className={`flex items-center justify-between border rounded-full focus:border-cta-500 px-6 py-3 w-full max-w-[500px] ${
              isFocused ? "border-cta-500" : "border-text-200"
            }`}
          >
            <input
              type="search"
              placeholder="Rechercher une formation..."
              className="w-full  text-sm outline-none focus:outline-none"
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
        {myTrainings.length === 0 && (
          <div className="flex flex-col items-center gap-6">
            <p className="text-center text-text-500 mt-8">
              Aucune formation pour le moment.
            </p>
            <Button to={"/dashboard/trainings/create"}>Creer</Button>
          </div>
        )}
      </Section>
    </Content>
  );
}
