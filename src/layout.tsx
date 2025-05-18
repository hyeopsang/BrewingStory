import { NavBar } from '@molecules/nav-bar';
import { Outlet } from 'react-router';

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
