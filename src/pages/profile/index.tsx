import { getUser, UserInfo } from '@api/user';
import { NavTab } from '@molecules/nav-tab';
import { ProfileInfo } from '@molecules/profile/profile-info';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router';
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

export function ProfileLayout() {
  const auth: AuthState = useSelector((state: StateType) => state.auth);
  const myInfo = auth?.user;
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState<UserInfo | null>(null);
  console.log(auth.user);
  const isMyProfile = !id || id === myInfo?.userId;

  useEffect(() => {
    if (isMyProfile) {
      setProfileUser(myInfo);
    } else {
      getUser(id!)
        .then(setProfileUser)
        .catch(() => {
          alert('회원 정보를 불러오지 못했습니다.');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="h-full bg-[#eeeeee] pt-3">
      <ProfileInfo userInfo={profileUser} />
      <NavTab />
      <div className="h-[calc(100% - 246px)] flex items-center justify-center">
        <Outlet />
      </div>
    </section>
  );
}
