import Section from "@/shared/components/Section";
import ReviewCard from "@/features/dashboard/components/ReviewCard";
import ReviewModal from "./ReviewModal";
import useReviews from "@/features/dashboard/hooks/useReviews";
import { Loader } from "lucide-react";

export default function TrainingReviewSection({ trainingId, isReviewOpen, setIsReviewOpen }) {
  const { reviews, isLoadingReviews } = useReviews(trainingId);

  if (isLoadingReviews) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader className="animate-spin w-6 h-6 text-text-500" />
      </div>
    );
  }

  const reviewsList = reviews.data;

  return (
    <>
      <Section last>
        <h3>Les derniers Avis</h3>
        {reviewsList.length === 0 ? (
          <small className="text-cta-500">
            Aucun avis n'a encore été laissé pour cette session.
          </small>
        ) : (
          <Section last>
            {[...reviewsList]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((review, index, array) => (
                <Section key={review._id} last={index === array.length - 1}>
                  <ReviewCard review={review} />
                </Section>
              ))}
          </Section>
        )}
      </Section>

      {/* 💬 Modale de review gérée depuis le parent */}
      <ReviewModal
        trainingId={trainingId}
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
      />
    </>
  );
}
