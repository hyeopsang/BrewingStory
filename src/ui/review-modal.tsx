import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReview, updateReview } from "../api";
import { useSelector } from "react-redux";
import { Review, ReviewContent } from "../types";
import { RootState } from "../app/redux/store";
import { RatingOption } from "./rating-option";
import { ChevronLeft, X } from "lucide-react";

export default function ReviewModal({
  setIsModal,
  placeId,
  placeName,
  data,
}: {
  setIsModal: (value: boolean) => void;
  placeId?: string;
  placeName?: string;
  data?: Review;
}) {
  const queryClient = useQueryClient();
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.user?.id;

  const ratingValues = { bad: 2, soso: 3, good: 4 };

  const initialContent: ReviewContent = data?.content || {
    taste: 0,
    mood: 0,
    kind: 0,
    comfort: 0,
    wifi: 0,
    parking: 0,
    text: "",
    placeName: placeName || "",
  };

  const [reviews, setReviews] = useState<ReviewContent>(initialContent);

  useEffect(() => {
    if (data?.content) {
      setReviews(data.content);
    }
  }, [data]);

  // 평가 항목 배열
  const ratingCategories = [
    { key: "taste", label: "맛" },
    { key: "mood", label: "분위기" },
    { key: "kind", label: "친절도" },
    { key: "comfort", label: "좌석 편안함" },
    { key: "wifi", label: "와이파이" },
    { key: "parking", label: "주차공간" },
  ];

  const handleRatingChange = (category: string, value: number) => {
    setReviews((prev) => ({ ...prev, [category]: value }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviews((prev) => ({ ...prev, text: e.target.value }));
  };

  // 리뷰 추가/수정 Mutations
  const mutation = useMutation({
    mutationFn: async () => {
      if (data?.id) {
        await updateReview({ placeId: data.placeId, id: data.id, content: reviews });
      } else {
        await addReview({ placeId, content: reviews, userId });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", placeId] });
      queryClient.invalidateQueries({ queryKey: ["userReviews", userId] });
      alert(data?.id ? "리뷰가 수정되었습니다." : "리뷰 작성이 완료되었습니다.");
      setSubmitStatus("success");
      setIsModal(false);
    },
    onError: (error) => {
      setSubmitStatus("error");
      alert("리뷰 저장에 실패하였습니다.");
      console.error("리뷰 저장 오류:", error);
    },
  });

  return (
    <div className="absolute text-md left-1/2 top-8 flex gap-4 w-[320px] -translate-x-1/2 flex-col rounded-[15px] bg-white/90 pb-4 text-center text-neutral-500 shadow-md h-fit">
      <div className="flex w-full justify-end">
        <button className="p-[15px]" onClick={() => setIsModal(false)}>
          <X />
        </button>
      </div>

      <div className="flex flex-col gap-[10px] px-[15px]">
        {ratingCategories.map(({ key, label }) => (
          <RatingOption
            key={key}
            category={key}
            label={label}
            value={reviews[key]}
            onChange={handleRatingChange}
            ratingValues={ratingValues}
          />
        ))}

        <h5>한줄 리뷰</h5>
        <input
          type="text"
          value={reviews.text}
          onChange={handleTextChange}
          minLength={3}
          maxLength={25}
          placeholder="한줄 리뷰"
          className="border px-2 py-1 text-neutral-900 rounded-md"
        />
      </div>

      <button className="text-md text-white bg-buttonRed mx-auto px-4 py-2 rounded-md" onClick={() => mutation.mutate()}>
        {data?.id ? "수정 완료" : "작성 완료"}
      </button>
    </div>
  );
}
