import { useParams, Link } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReviewModal from "../../ui/review-modal";
import { useReviews } from "../../api"; 
import OtherReview from "./other-review";
import MyReview from "./my-review";
import { Review, Place } from "../../types";
import PlaceInfo from "./place-info";
import { Button } from "../../components/ui/button";
import { ChevronLeft } from "lucide-react";

interface User {
  [key: string]: any;
}

export interface StateType {
  isAuthenticated: boolean;
  user: User | null;
}

export default function PlaceReviewPage() {
  const [isModal, setIsModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const { id } = useParams(); 

  const places = useSelector((state: { places?: Place[] }) => state.places ?? []);
  const auth = useSelector((state: { auth?: User }) => state.auth ?? { user: null });
  const userId = auth?.user?.id ?? null;

  const place = places.find((p) => p.id === id);

  const { data: reviews = [] } = useReviews(place?.id || "");

  if (!places.length || !place) {
    return <p>카페 데이터를 불러오는 중입니다...</p>;
  }

  const userReviews = reviews.filter((review) => review.userId === userId);
  const otherReviews = reviews.filter((review) => review.userId !== userId);


  const onClickModal = (review: Review | null) => {
    setSelectedReview(review);
    setIsModal(true);
  };
  if (!places || places.length === 0) {
    return <p>카페 데이터를 불러오는 중입니다...</p>;
  }
  

  return (
    <div className="mx-auto flex flex-col w-full bg-white text-sm p-3 text-[#212121]">
      <Link to="/">
      <div className="w-fit flex justify-center p-2 rounded-full bg-buttonRed">
        <ChevronLeft className="text-white" />
      </div>
      </Link>
      <div className="w-full flex flex-col gap-6 p-3">
      <div className="w-full mx-auto grid grid-cols-3 gap-4 text-xs font-bold text-[#212121]">
        
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        {userId ? (
          <MyReview reviews={userReviews} onClickModal={onClickModal} />
        ) : (
          <div className="w-full flex flex-col gap-2 py-4 items-center border rounded-xl border-neutral-300">
            <p className="font-medium text-slate-600 text-xs">리뷰를 작성하려면 로그인이 필요해요!</p>
            <Button asChild className="bg-buttonRed text-white font-normal shadow-none drop-shadow-none">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        )}
        <OtherReview reviews={otherReviews} />
      </div>
      </div>
      {isModal && (
        <ReviewModal
          setIsModal={setIsModal}
          placeId={place.id}
          data={selectedReview}
        />
      )}
    </div>
  );
}
