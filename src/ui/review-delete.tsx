import { Button } from "../components/ui/button";
import { deleteReview } from "../api";
import { Review } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ReviewDeleteProps {
  review: Review;
}

export default function ReviewDelete({ review: { placeId, id, userId } }: ReviewDeleteProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", placeId] });
      queryClient.invalidateQueries({ queryKey: ["userReviews", userId] });
      alert("리뷰가 삭제되었습니다.");
    },
    onError: (error) => {
      alert("리뷰 삭제에 실패했습니다.");
      console.error(`리뷰 삭제 오류: ${error}`);
    },
  });

  const handleDelete = () => {
    const isConfirmed = window.confirm("정말로 이 리뷰를 삭제하시겠습니까?");
    if (isConfirmed) {
      mutate({ placeId, id });
    }
  };

  return (
    <Button
      variant="default"
      className="w-fit bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
      onClick={handleDelete}
    >
      삭제
    </Button>
  );
}
