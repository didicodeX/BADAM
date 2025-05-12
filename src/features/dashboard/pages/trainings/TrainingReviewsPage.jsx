import { useParams } from "react-router-dom";
import useReviews from "@/features/dashboard/hooks/useReviews";
import Section from "@/shared/components/Section";
import ReviewCard from "@/features/dashboard/components/ReviewCard";
import { Loader } from "lucide-react";
import Content from "@/shared/components/Content";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Star } from "lucide-react";

export default function TrainingReviewsPage() {
  const { id: trainingId } = useParams();
  const { reviews, isLoadingReviews } = useReviews(trainingId);

  if (!trainingId) {
    return (
      <Content>
        <p className="text-red-500 font-bold">Aucune formation ciblée.</p>
      </Content>
    );
  }

  if (isLoadingReviews) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader className="animate-spin w-6 h-6 text-text-500" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <Content>
        <p className="text-text-500">Aucun avis pour cette formation.</p>
      </Content>
    );
  }

  // ✅ Grouper les reviews par session._id
  const reviewsGrouped = reviews.data.reduce((acc, review) => {
    const sessionId = review.session?._id || review.session;
    if (!acc[sessionId]) acc[sessionId] = { reviews: [], session: review.session };
    acc[sessionId].reviews.push(review);
    return acc;
  }, {});

  // ✅ Transformer en tableau et trier par date
  const groupedArray = Object.values(reviewsGrouped).sort((a, b) => {
    const dateA = new Date(a.session?.startDateTime || 0);
    const dateB = new Date(b.session?.startDateTime || 0);
    return dateB - dateA;
  });

  return (
    <Content>
      <h2 className="text-xl font-bold mb-6">Avis groupés par session</h2>

      {groupedArray.map(({ session, reviews }, idx) => {
        const dateLabel = session?.startDateTime
          ? format(new Date(session.startDateTime), "d MMMM yyyy", { locale: enUS })
          : "Session inconnue";

        const avg =
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0;

        return (
          <Section key={session?._id || idx} last>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              {dateLabel} — <Star className=" text-cta-500 fill-cta-500"/> {avg.toFixed(1)}
            </h3>

            {reviews.map((review, i) => (
              <Section key={review._id} last={i === reviews.length - 1}>
                <ReviewCard review={review} />
              </Section>
            ))}
          </Section>
        );
      })}
    </Content>
  );
}
