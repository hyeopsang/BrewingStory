import { useSelector } from "react-redux";
import { Review } from "../types";
import { Button } from "../components/ui/button";
import { formattedTime } from "../utils/fomattedTime";
import ReviewDelete from "./review-delete";
import ReviewRepost from "./review-repost";

interface ReviewItemProps {
    review?: Review;
    onClickModal?: () => void
}
interface User {
    [key: string]: any;
}
export default function ReviewItem({ review, onClickModal } : ReviewItemProps) {
    const auth = useSelector((state: { auth: User }) => state.auth);
    const userId = auth?.user?.id ?? null;

    return (
        <div
        className="w-full mx-auto flex flex-col items-center gap-2 rounded-2xl py-4 border border-neutral-200 shadow-sm text-sm text-neutral-900"
        >
            <p className="font-bold text-md">{review.content.placeName}</p>
            <p className="text-neutral-500">{formattedTime(review.createdAt)}</p>
            <p>{review.content.text}</p>                
            {
                userId === review.userId && (
                    <div className="flex justify-center gap-2">
                    <ReviewRepost onClickModal={onClickModal}/>
                    <ReviewDelete review={review} />
                    </div>
                )
            }
        </div>
    )
}