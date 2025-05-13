import { useState } from "react";
import FavoriteCard from "@/features/home/components/FavoriteCard";
import { useAuth } from "@/features/auth/hooks/useAuth"; // ← hook maison à adapter
import { useNavigate } from "react-router-dom";
import useLanding from "../hooks/useLanding";
import Section from "@/shared/components/Section";
import Content from "@/shared/components/Content";
import Button from "@/shared/components/Button";
import CardListContainer from "@/shared/components/CardListContainer";
import LoadingScreen from "@/shared/components/LoadingScreen";

export default function FeaturedTrainingsSection() {
  const { allSessions, isLoadingAllSession } = useLanding();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [visibleCount, setVisibleCount] = useState(6);

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
  };

  if (isLoadingAllSession) return <LoadingScreen />;

  const visibleSessions = allSessions.slice(0, visibleCount);

  return (
    <Content public>
      <h4 className="text-center">Apprendre en faisant</h4>

      <Section>
        <CardListContainer>
          {visibleSessions.map((session) => (
            <FavoriteCard
              key={session._id}
              id={session._id}
              trainingTitle={session.training.title}
              trainingImage={session.training.images[0]}
              session={session}
              isFavorite={session.isFavorite}
              onToggleFavorite={() => handleFavoriteClick()}
            />
          ))}
        </CardListContainer>
        {allSessions.length > visibleCount && (
          <div className="text-center mt-8">
            <Button onClick={() => setVisibleCount((prev) => prev + 6)}>
              Voir plus
            </Button>
          </div>
        )}
      </Section>
    </Content>
  );
}
