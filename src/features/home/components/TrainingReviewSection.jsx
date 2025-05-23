import { format } from "date-fns";
import { frCA } from "date-fns/locale";
import Section from "@/shared/components/Section";
import ReviewCard from "@/features/dashboard/components/ReviewCard";
import ReviewModal from "./ReviewModal";
import useReviews from "@/features/dashboard/hooks/useReviews";
import { Star } from "lucide-react";
import LoadingScreen from "@/shared/components/LoadingScreen";

export default function TrainingReviewSection({
  trainingId,
  sessionId,
  isReviewOpen,
  setIsReviewOpen,
}) {
  const { reviews, isLoadingReviews } = useReviews(trainingId);

  if (isLoadingReviews) return <LoadingScreen />;

  const reviewsList = reviews.data;

  // Grouper les reviews par session
  const grouped = reviewsList.reduce((acc, review) => {
    const sessionId = review.session?._id || review.session;
    if (!acc[sessionId])
      acc[sessionId] = { session: review.session, reviewsList: [] };
    acc[sessionId].reviewsList.push(review);
    return acc;
  }, {});

  const groupedArray = Object.values(grouped).sort((a, b) => {
    const dateA = new Date(a.session?.startDateTime || 0);
    const dateB = new Date(b.session?.startDateTime || 0);
    return dateB - dateA;
  });

  return (
    <>
      <Section last>
        <h3 className="text-lg font-semibold mb-2">
          {reviewsList.length}{" "}
          {reviewsList.length > 1 ? "avis laissés" : "avis laissé"} par les
          participants
        </h3>

        {isLoadingReviews ? (
          <LoadingScreen />
        ) : groupedArray.length === 0 ? (
          <small className="text-cta-500">
            Aucun avis n'a encore été laissé pour cette formation.
          </small>
        ) : (
          groupedArray.map(({ session, reviewsList }, idx) => {
            const avg =
              reviewsList.reduce((acc, r) => acc + r.rating, 0) /
                reviewsList.length || 0;

            const date = session?.startDateTime
              ? format(new Date(session.startDateTime), "d MMMM yyyy", {
                  locale: frCA,
                })
              : "Session inconnue";

            return (
              <Section key={session?._id || idx}>
                <h4 className="text-base font-semibold mb-1 flex items-center gap-2">
                  Session du {date}
                  <span className="flex items-center gap-1 text-cta-500">
                    <Star className="w-4 h-4 fill-cta-500" />
                    {avg.toFixed(1)}
                  </span>
                </h4>

                {reviewsList.map((review, index, array) => (
                  <Section key={review._id} last={index === array.length - 1}>
                    <ReviewCard review={review} />
                  </Section>
                ))}
              </Section>
            );
          })
        )}
      </Section>

      {/* 💬 Modale de review gérée depuis le parent */}
      <ReviewModal
        trainingId={trainingId}
        sessionId={sessionId}
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
      />
    </>
  );
}
