import { UserInfo } from '@api/user';
import { logout } from '@app/redux/authSlice';
import { ProfileInfo } from '@molecules/profile-info';
import { NavTab } from '@template/nav-tab';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';
interface StateType {
  isAuthenticated: boolean;
  user: UserInfo | null;
  auth: {
    user: UserInfo | null;
  };
}

interface AuthState {
  user: UserInfo | null;
}

export function Profile() {
  const auth: AuthState = useSelector((state: StateType) => state.auth);
  const userInfo = auth?.user;
  const dispatch = useDispatch();
  console.log(auth.user);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };
  return (
    <article className="h-full bg-[#c1c1c1]">
      <ProfileInfo userInfo={userInfo} />
      <div className="sticky z-10 bg-white">
        <NavTab />
      </div>
      <div className="h-full">
        <Outlet />
      </div>
    </article>
  );
}
