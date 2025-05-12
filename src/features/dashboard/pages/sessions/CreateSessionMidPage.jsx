import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Content from "@/shared/components/Content";
import Section from "@/shared/components/Section";
import Button from "@/shared/components/Button";
import { useTraining } from "../../hooks/useTrainings";

export default function CreateSessionMidPage() {
  const navigate = useNavigate();
  const [selectedTrainingId, setSelectedTrainingId] = useState(null);
  const { myTrainings } = useTraining(); // à implémenter si besoin

  const handleSelect = (id) => {
    setSelectedTrainingId(id);
  };

  const handleContinue = () => {
    if (selectedTrainingId) {
      navigate(`/dashboard/trainings/${selectedTrainingId}/create`);
    }
  };

  return (
    <Content>
      <h2>Créer une session</h2>
      <Section>
        <p className="mb-4">Choisissez une formation pour continuer :</p>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3">
          {myTrainings.map((training) => (
            <button
              key={training._id}
              onClick={() => handleSelect(training._id)}
              className={`border rounded p-4 hover:border-cta-500 transition ${
                selectedTrainingId === training._id
                  ? "border-cta-500 bg-cta-50"
                  : "border-text-200"
              }`}
            >
              <h4 className="font-semibold">{training.title}</h4>
              <img
                src={training.images[0]}
                alt={training.title}
                className="w-full h-32 object-cover rounded mt-2" 
              />
            </button>
          ))}
        </div>
        <div className="mt-6">
          <Button disabled={!selectedTrainingId} onClick={handleContinue}>
            Continuer
          </Button>
        </div>
      </Section>
    </Content>
  );
}
