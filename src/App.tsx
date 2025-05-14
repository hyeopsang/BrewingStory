import { RouterProvider } from 'react-router';

import { AppRouter } from './app/AppRouter';

export function App() {
  return <RouterProvider router={AppRouter} />;
}
