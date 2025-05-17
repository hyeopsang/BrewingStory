import { PhotoEdit } from '@pages/add-post/photo-Edit';
import { VideoEdit } from '@pages/add-post/video-edit';
import { Feed } from '@pages/feed';
import { FeedTab } from '@pages/feed-tab';
import { FeedView } from '@pages/feed-view';
import { Logging } from '@pages/logging';
import { Login } from '@pages/login';
import { Main } from '@pages/main';
import { PlaceDetail } from '@pages/place-detail';
import { FilterEdit } from '@pages/profile/filter-edit';
import { Profile } from '@pages/profile/profile';
import { ProfileEdit } from '@pages/profile/profile-edit';
import { TagTab } from '@pages/profile/tag-tab';
import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '../layout';
import { ProtectedRoute } from './ProtectedRoute';

const RouterInfo = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/', // 루트 경로
        index: true, // 기본적으로 렌더링될 컴포넌트 지정
        element: <Main />, // 기본 화면으로 KakaoMap을 렌더링
      },
      {
        path: '/feed', // 피드 경로
        element: <Feed />,
      },
      {
        path: '/profile/:id',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true, // 기본 자식 경로
            element: <FeedTab />,
          },
          {
            path: 'feed',
            element: <FeedTab />,
          },
          {
            path: 'tag-tab',
            element: <TagTab />,
          },
        ],
      },
      {
        path: '/post-view',
        element: <FeedView />,
      },
      {
        path: '/profile-edit',
        element: (
          <ProtectedRoute>
            <ProfileEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: '/filter-edit',
        element: (
          <ProtectedRoute>
            <FilterEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: '/auth/kakao/callback', // 카카오 인증 콜백
        element: <Logging />,
      },
    ],
  },
  {
    path: '/place-detail/:id',
    element: <PlaceDetail />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: 'edit/photo',
    element: (
      <ProtectedRoute>
        <PhotoEdit />
      </ProtectedRoute>
    ),
  },
  {
    path: 'edit/video',
    element: (
      <ProtectedRoute>
        <VideoEdit />
      </ProtectedRoute>
    ),
  },
];

export const AppRouter = createBrowserRouter(RouterInfo);
