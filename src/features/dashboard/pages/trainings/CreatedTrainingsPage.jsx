import { useState } from "react";
import LoadingScreen from "@/shared/components/LoadingScreen";
import { useTraining } from "../../hooks/useTrainings";
import TrainingCard from "../../components/TrainingCard";
import { Search } from "lucide-react";
import Content from "@/shared/components/Content";
import Section from "@/shared/components/Section";
import EmptySection from "../../components/EmptySection";
import CardListContainer from "@/shared/components/CardListContainer";

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
        <CardListContainer>
          {myTrainings.map((training) => (
            <TrainingCard
              key={training._id}
              id={training._id}
              title={training.title}
              description={training.description}
              imageUrl={training.images[0]}
            />
          ))}
        </CardListContainer>
        {myTrainings.length === 0 && (
          <EmptySection
            title="Aucune formation créées pour le moment."
            link={{
              to: "/dashboard/create-training",
              label: "Créées votre premiere formation",
            }}
          />
        )}
      </Section>
    </Content>
  );
}
