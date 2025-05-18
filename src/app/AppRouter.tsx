import { createBrowserRouter } from 'react-router-dom';
import { Feed } from 'src/pages/feed';
import { FilterEdit } from 'src/pages/filter-edit';
import { Logging } from 'src/pages/login/logging';
import { Login } from 'src/pages/login/login';
import { Main } from 'src/pages/map';
import { PlaceDetail } from 'src/pages/place';
import { PhotoEdit } from 'src/pages/post/photo-Edit';
import { VideoEdit } from 'src/pages/post/video-edit';
import { ProfileLayout } from 'src/pages/profile';
import { FeedTab } from 'src/pages/profile/feed-tab';
import { FeedView } from 'src/pages/profile/feed-view';
import { TagTab } from 'src/pages/profile/tag-tab';
import { ProfileEdit } from 'src/pages/profile-edit';

import { Layout } from '../layout';
import { ProtectedRoute } from './ProtectedRoute';

const RouterInfo = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        index: true,
        element: <Main />,
      },
      {
        path: '/feed',
        element: <Feed />,
      },
      {
        path: '/profile/:id',
        element: (
          <ProtectedRoute>
            <ProfileLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
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
        path: '/feed-view',
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
        path: '/auth/kakao/callback',
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
