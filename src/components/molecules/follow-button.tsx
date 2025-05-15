import { followUser, isFollowing, unfollowUser } from '@api/user';
import { useEffect, useState } from 'react';

export const FollowButton = ({
  currentUserId,
  targetUserId,
}: {
  currentUserId: string;
  targetUserId: string;
}) => {
  const [isFollowingState, setIsFollowingState] = useState<boolean>(false);

  useEffect(() => {
    const check = async () => {
      const result = await isFollowing(currentUserId, targetUserId);
      setIsFollowingState(result);
    };
    check();
  }, [currentUserId, targetUserId]);

  const toggleFollow = async () => {
    if (isFollowingState) {
      await unfollowUser(currentUserId, targetUserId);
    } else {
      await followUser(currentUserId, targetUserId);
    }
    setIsFollowingState(!isFollowingState);
  };

  return (
    <button
      onClick={toggleFollow}
      className={`${isFollowingState ? 'hidden' : ''}`}
    >
      팔로우
    </button>
  );
};
