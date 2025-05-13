import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../components/pages/Main";
import BookMarkTab from "../components/pages/book-mark-tab";
import Feed from "../components/pages/feed";
import FeedTab from "../components/pages/feed-tab";
import FilterEdit from "../components/pages/filter-edit";
import Auth from "../components/pages/logging";
import Login from "../components/pages/login";
import PhotoEdit from "../components/pages/photo-Edit";
import Profile from "../components/pages/profile";
import ProfileEdit from "../components/pages/profile-edit";
import VideoEdit from "../components/pages/video-edit";
import Layout from "../layout";
import ProtectedRoute from "./ProtectedRoute";

const RouterInfo = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/", // 루트 경로
				index: true, // 기본적으로 렌더링될 컴포넌트 지정
				element: <Main />, // 기본 화면으로 KakaoMap을 렌더링
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
						element: <FeedTab />,
					},
					{
						path: "feed",
						element: <FeedTab />,
					},
					{
						path: "bookmark",
						element: <BookMarkTab />,
					},
				],
			},
			{
				path: "/profile-edit",
				element: <ProfileEdit />,
			},
			{
				path: "/filter-edit",
				element: <FilterEdit />,
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
	},
];

export const AppRouter = createBrowserRouter(RouterInfo);
