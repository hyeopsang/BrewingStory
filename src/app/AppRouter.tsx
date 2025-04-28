import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import KakaoMap from "../map";
import PlaceReviewPage from "../place/ui";
import Auth from "../login/logging";
import Login from "../login/login";
import ReviewList from "../profile/ui/review-list";
import BookMark from "../bookmark/book-mark";
import Feed from "../feed/feed";
import Profile from "../profile/profile";
import Layout from "../layout";

const RouterInfo = [
  {
    path: "/",
    element: <Layout />, // Layout 컴포넌트로 전체 레이아웃을 감쌈
    children: [
      {
        path: "/", // 루트 경로
        index: true, // 기본적으로 렌더링될 컴포넌트 지정
        element: <KakaoMap />, // 기본 화면으로 KakaoMap을 렌더링
      },
      {
        path: "/home", // 홈 경로
        element: <KakaoMap />,
      },
      {
        path: "/book-mark", // 즐겨찾기 경로
        element: <BookMark />,
      },
      {
        path: "/feed", // 피드 경로
        element: <Feed />,
      },
      {
        path: "/profile", // 프로필 경로
        element: <Profile />,
      },
      {
        path: "/login", // 로그인 경로
        element: <Login />,
      },
      {
        path: "/my-review", // 리뷰 경로, 인증 필요
        element: (
          <ProtectedRoute>
            <ReviewList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/auth/kakao/callback", // 카카오 인증 콜백
        element: <Auth />,
      },
      {
        path: "/place/:id", // 개별 장소 상세 페이지
        element: <PlaceReviewPage />,
      },
    ],
  },
];

export const AppRouter = createBrowserRouter(RouterInfo);
