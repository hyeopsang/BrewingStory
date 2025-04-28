import { Review } from "../../types";
import ReviewItem from "../../ui/review-item";

interface OtherReviewProps {
    reviews: Review[];
  }

export default function OtherReview ({ reviews }: OtherReviewProps) {
    return (
        <>
          {reviews.length > 0 ? (
            reviews.map((review, id) => (
              <ReviewItem key={id} review={review}/>
            ))
          ) : (
            <div className="w-full flex justify-center gap-10 rounded-2xl bg-neutral-100 py-4 text-center text-[16px] font-normal shadow-sm text-[#212121]">
              <p className="text-sm text-neutral-900">작성된 리뷰가 없어요ㅠ</p>
            </div>

          )}
        </>
    )
}
