import { useParams } from "react-router-dom";
import useSessionReviews from "@/features/dashboard/hooks/useSessionReviews";
import Content from "@/shared/components/Content";
import Section from "@/shared/components/Section";
import ReviewCard from "@/features/dashboard/components/ReviewCard";
import LoadingScreen from "@/shared/components/LoadingScreen";

export default function SessionReviewsPage() {
  const { id } = useParams();
  const { reviews, isLoading } = useSessionReviews(id);

  if (isLoading) return <LoadingScreen />;

  return (
    <Content>
      <h2 className="text-xl font-bold mb-4">Avis de la session</h2>
      <Section last>
        {reviews.length === 0 ? (
          <p className="text-text-500">Aucun avis pour cette session.</p>
        ) : (
          reviews.map((review, index, array) => (
            <Section key={review._id} last={index === array.length - 1}>
              <ReviewCard key={review._id} review={review} />
            </Section>
          ))
        )}
      </Section>
    </Content>
  );
}
