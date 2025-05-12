import { useState } from "react";
import Modal from "@/shared/components/Modal";
import { useForm } from "react-hook-form";
import { Star } from "lucide-react";
import useReviews from "@/features/dashboard/hooks/useReviews";
import Button from "@/shared/components/Button";

export default function ReviewModal({ trainingId,sessionId, isOpen, onClose }) {
  const { register, handleSubmit, reset } = useForm();
  const [rating, setRating] = useState(0);
  const { createReview } = useReviews(trainingId);

  const onSubmit = (data) => {
    createReview({ trainingId,sessionId, ...data, rating });
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Laisser un avis">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="block text-sm font-medium">Votre commentaire</label>
        <textarea
          {...register("comment", { required: true })}
          className="w-full border border-text-200 rounded-md px-3 py-2"
        />

        <label className="block text-sm font-medium">Note</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => setRating(star)}
              className={`w-5 h-5 cursor-pointer ${
                star <= rating ? "text-cta-500 fill-cta-500" : "text-text-200"
              }`}
            />
          ))}
        </div>
        <Button type="submit">Envoyer l'avis</Button>
      </form>
    </Modal>
  );
}
