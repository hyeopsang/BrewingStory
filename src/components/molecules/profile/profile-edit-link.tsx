import { Link } from 'react-router';

export const ProfileEditLink = () => {
  return (
    <Link
      className="border-blk w-1/2 rounded-full border-3 py-1.5 text-center"
      to="/profile-edit"
    >
      프로필 관리
    </Link>
  );
};
