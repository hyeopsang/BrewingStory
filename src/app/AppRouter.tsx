import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Main from "../pages/Main";
import Auth from "../pages/logging";
import Login from "../pages/login";
import Feed from "../pages/feed";
import Profile from "../pages/profile";
import Layout from "../layout";
import { Children } from "react";
import FeedTab from "../pages/feed-tab";
import BookMarkTab from "../pages/book-mark-tab";
import ProfileEdit from "../pages/profile-edit";
import FilterEdit from "../pages/filter-edit";
import PhotoEdit from "../pages/photo-Edit";
import VideoEdit from "../pages/video-edit";

const RouterInfo = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/", // 루트 경로
        index: true, // 기본적으로 렌더링될 컴포넌트 지정
        element: <Main/>, // 기본 화면으로 KakaoMap을 렌더링
      },
      {
        path: "/feed", // 피드 경로
        element: <Feed />,
      },
      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            index: true, // 기본 자식 경로
            element: <FeedTab />
          },
          {
            path: "feed",
            element: <FeedTab />
          },
          {
            path: "bookmark",
            element: <BookMarkTab />
          }
        ]
      },
      {
        path: "/profile-edit",
        element: <ProfileEdit />
      },
      {
        path: "/filter-edit",
        element: <FilterEdit />
      },
      {
        path: "/auth/kakao/callback", // 카카오 인증 콜백
        element: <Auth />,
      },
    ],
  },
  {
    path: "/login", // 로그인 경로
    element: <Login />,
  },
  {
    path: "edit/photo",
    element: <PhotoEdit />,
  },
  {
    path: "edit/video",
    element: <VideoEdit />,
  }
];

export const AppRouter = createBrowserRouter(RouterInfo);
