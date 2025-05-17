import { UserInfo } from '@api/user';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FollowButton } from './follow-button';
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

export function ProfileInfo({ userInfo }: { userInfo: UserInfo }) {
  const auth: AuthState = useSelector((state: StateType) => state.auth);
  const myInfo = auth?.user;

  return (
    <div className="shadow-blk/15 mx-auto h-fit w-[90%] rounded-2xl bg-white px-3 shadow">
      <div className="flex flex-wrap items-center gap-6 px-3 py-2 pt-6 text-sm">
        <div className="base:w-23 shadow-blk/15 aspect-square overflow-hidden rounded-full bg-white shadow sm:w-22 lg:w-24">
          {myInfo?.userImage ? (
            <img
              src={myInfo?.userImage}
              className="h-full w-full object-cover"
              alt="프로필 이미지"
            />
          ) : (
            ''
          )}
        </div>
        <div className="text-blk flex flex-col justify-center gap-4">
          <h2 className="text-responsive font-bold">
            {userInfo?.nickname || 'nickname'}
          </h2>
          <div className="text-responsive-xs flex items-center gap-3">
            <p>팔로워 0</p>
            <p>팔로잉 0</p>
          </div>
        </div>
        {userInfo?.userId === myInfo?.userId ? (
          <div className="text-responsive-xs text-blk flex w-full gap-6 p-1">
            <Link
              className="bg-blk/10 w-1/2 rounded-full py-1.5 text-center"
              to="/profile-edit"
            >
              프로필 관리
            </Link>
            <Link
              className="bg-blk/10 w-1/2 rounded-full py-1.5 text-center"
              to="/filter-edit"
            >
              맞춤 필터 편집
            </Link>
          </div>
        ) : (
          <FollowButton
            currentUserId={String(myInfo?.userId)}
            targetUserId={String(userInfo?.userId)}
          />
        )}
      </div>
    </div>
  );
}
