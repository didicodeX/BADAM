import { Star } from "lucide-react";
import { formatDate } from "@/shared/utils/formatDate";
import Avatar from "./Avatar";

export default function ReviewCard({ review }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Avatar user={review.author} />
        <p className="font-medium">{review.author.name}</p>
      </div>
      <div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, index) =>
            index < review.rating ? (
              <Star key={index} fill="#F77518" className="w-5 h-5 text-warning-500 " />
            ) : (
              <Star key={index} className="w-5 h-5 text-warning-500" />
            )
          )}
        </div>
        <p className="text-text-500 font-medium">
          {formatDate(review.createdAt)}
        </p>
      </div>
      <p className="text-sm">{review.comment}</p>
    </div>
  );
}
