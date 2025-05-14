import { Image } from '@atoms/Image';
import { Link } from 'react-router-dom';

interface ProfileInfoProps {
  profileImageUrl: string;
}

export function ProfileInfo(profileImageUrl: ProfileInfoProps) {
  return (
    <div className="h-fit w-full bg-white px-3">
      <div className="flex flex-wrap items-center gap-6 px-3 py-2 pt-6 text-sm">
        <div className="base:w-23 aspect-square overflow-hidden rounded-full border bg-white sm:w-22 lg:w-24">
          <Image
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
        <div className="text-responsive-xs flex w-full gap-3 py-1">
          <Link
            className="w-1/2 rounded-[10px] border py-1.5 text-center"
            to="/profile-edit"
          >
            프로필 관리
          </Link>
          <Link
            className="w-1/2 rounded-[10px] border py-1.5 text-center"
            to="/filter-edit"
          >
            맞춤 필터 편집
          </Link>
        </div>
      </div>
    </div>
  );
}
