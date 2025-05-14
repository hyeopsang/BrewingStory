import { logout } from '@app/redux/authSlice';
import { ProfileInfo } from '@molecules/profile-info';
import { NavTab } from '@template/nav-tab';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';
interface User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export function Profile() {
  const auth: AuthState = useSelector((state: StateType) => state.auth);
  const userInfo = auth.user?.properties || null;
  const dispatch = useDispatch();
  console.log(auth.user);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };
  const profileImageUrl = userInfo?.profile_image
    ? userInfo.profile_image.replace('http://', 'https://')
    : '';
  console.log('userInfo', userInfo);
  return (
    <div>
      <article>
        <ProfileInfo profileImageUrl={profileImageUrl} />
        <div className="sticky z-10 bg-white">
          <NavTab />
        </div>
        <Outlet />
      </article>
    </div>
  );
}
