import { Outlet } from 'react-router';

import { NavBar } from './components/template/nav-bar';

export function Layout() {
  return (
    <div className="h-dvh w-full">
      <div className="h-[calc(100%-52px)] w-full">
        <Outlet />
      </div>
      <NavBar />
    </div>
  );
}
