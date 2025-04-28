import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ReviewItem from "../../ui/review-item";
import ReviewModal from "../../ui/review-modal";
import { Review } from "../../types";
import { getUserReviews, useUserReviews } from "../../api"; // getUserReviews를 사용하는 훅
import { useInfiniteScroll } from "../utils/useInfiniteScroll";// 커스텀 훅 import
import { ChevronLeft } from "lucide-react";

interface User {
  [key: string]: any;
}
interface StateType {
  isAuthenticated: boolean;
  user: User | null;
  auth: {
    user: User | null;
  };
}
interface AuthState {
  user: User | null;
}

export default function ReviewList() {
  const [isModal, setIsModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [reviewsList, setReviewsList] = useState<Review[]>([]); // 리뷰 리스트 상태
  const [nextQuery, setNextQuery] = useState<any>(null); // 다음 쿼리 저장
  const [loading, setLoading] = useState(false); // 로딩 상태 관리

  const auth: AuthState = useSelector((state: StateType) => state.auth);
  const userId = auth.user?.id;

  const { data: initialReviews, isLoading, error } = useUserReviews(userId);

  useEffect(() => {
    if (initialReviews) {
      setReviewsList(initialReviews.reviews); // 첫 번째 페이지 로드
      setNextQuery(initialReviews.nextQuery); // 다음 쿼리 설정
    }
  }, [initialReviews]);

  const loadMoreReviews = async () => {
    if (nextQuery && !loading) {
      setLoading(true);
      try {
        const { reviews, nextQuery: newNextQuery } = await getUserReviews(userId, nextQuery); // 더 많은 리뷰 요청
        setReviewsList((prev) => [...prev, ...reviews]); // 기존 리뷰에 추가
        setNextQuery(newNextQuery); // 새로운 쿼리 설정
      } catch (err) {
        console.error("🚨 Error loading more reviews:", err);
      }
      setLoading(false);
    }
  };

  // 무한 스크롤 훅 사용
  const { setTarget } = useInfiniteScroll({
    rootMargin: "100px",
    onIntersect: loadMoreReviews,
    enabled: !!nextQuery && !loading,
  });

  const onClickModal = (review: Review | null) => {
    setSelectedReview(review);
    setIsModal(true);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    console.error("🚨 Error loading reviews: ", error);
    return <div>에러로 인해 리뷰를 불러오지 못했습니다.</div>;
  }

  return (
    <div className="w-full h-screen p-3 text-neutral-900">
      <Link to={"/"}>
      <div className="w-fit p-2 rounded-full bg-buttonRed">
        <ChevronLeft className="text-white" />
      </div>
      </Link>
      <div className="flex flex-col gap-4 p-3">
        {reviewsList.length > 0 ? (
        reviewsList.map((review, index) => (
          <div key={review.id} ref={index === reviewsList.length - 1 ? setTarget : null}>
            <ReviewItem review={review} onClickModal={() => onClickModal(review)} />
          </div>
        ))
        ) : (
          <div>작성된 리뷰가 없어요ㅠ</div>
        )}
      </div>
      

      {loading && <div>리뷰를 불러오는 중 ..</div>}

      {isModal && <ReviewModal setIsModal={setIsModal} data={selectedReview} />}
    </div>
  );
}
