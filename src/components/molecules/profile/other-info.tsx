import { FollowButton } from '@molecules/shared/follow-button';

interface OtherInfoProps {
  profileImageUrl: string;
  myId: string;
}

export function OtherInfo(profileImageUrl: OtherInfoProps) {
  return (
    <div className="h-fit w-full bg-white px-3">
      <div className="flex flex-wrap items-center gap-6 px-3 py-2 pt-6 text-sm">
        <div className="base:w-23 aspect-square overflow-hidden rounded-full border bg-white sm:w-22 lg:w-24">
          <img
            src={profileImageUrl.profileImageUrl}
            className="h-full w-full object-cover"
            alt="프로필 이미지"
          />
        </div>
        <div className="responsive-sm flex flex-col justify-center gap-4">
          <p className="responsive-sm">상협</p>
          <div className="flex items-center gap-3">
            <p>팔로워 0</p>
            <p>팔로잉 0</p>
          </div>
        </div>
        <button className="text-responsive-xs flex w-full gap-3 py-1">
          <FollowButton currentUserId={''} targetUserId={''} />
        </button>
      </div>
    </div>
  );
}
