import { FeedIcon } from '@atoms/icons/feed-icon';
import { TagIcon } from '@atoms/icons/tag-icon';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router';
import { StateType } from 'src/types/auth';

export function NavTab() {
  const auth = useSelector((state: StateType) => state.auth);
  const userInfo = auth.user;
  const location = useLocation();
  const isFeedActive = location.pathname === `/profile/${userInfo?.userId}`;
  const isBookmarkActive = location.pathname.includes(
    `/profile/${userInfo?.userId}/tag-tab`
  );

  return (
    <nav className="w-ful relative flex h-12">
      <Link
        to={`/profile/${userInfo?.userId}`}
        className={`flex w-1/2 items-center justify-center border-b-2 ${
          isFeedActive ? 'border-blk' : 'border-white'
        }`}
      >
        <FeedIcon
          className={`text-xl ${isFeedActive ? 'text-blk' : 'text-[#c1c1c1]'}`}
        />
      </Link>

      <Link
        to={`/profile/${userInfo?.userId}/tag-tab`}
        className={`flex w-1/2 items-center justify-center border-b-2 ${
          isBookmarkActive ? 'border-blk' : 'border-white'
        }`}
      >
        <TagIcon
          className={`text-xl ${isBookmarkActive ? 'text-blk' : 'text-[#c1c1c1]'}`}
        />
      </Link>
    </nav>
  );
}
