import { followUser, isFollowing, unfollowUser } from '@api/user';
import { Button } from '@atoms/elements/button';
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
    <Button
      onClick={toggleFollow}
      size="full"
      className={`text-responsive-xs mx-auto justify-center rounded-full py-1.5 text-center ${isFollowingState ? 'border-blk border' : 'bg-blk text-white'}`}
    >
      팔로우
    </Button>
  );
};
