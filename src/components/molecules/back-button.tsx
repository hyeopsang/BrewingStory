import { LeftIcon } from '@atoms/icons/left-icon';
import { useNavigate } from 'react-router';

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <LeftIcon
      className="text-responsive text-blk"
      onClick={() => navigate(-1)}
    />
  );
};
