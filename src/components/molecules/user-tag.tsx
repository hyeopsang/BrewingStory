import { Button } from '@atoms/elements/button';
import { RightIcon } from '@atoms/icons/right-icon';
import { UserTagIcon } from '@atoms/icons/user-tag-icon';

interface UserTagProps {
  onOpen: () => void;
}

export function UserTag({ onOpen }: UserTagProps) {
  return (
    <Button
      onClick={onOpen}
      className="text-blk w-full justify-between border-none bg-white from-white via-neutral-100 via-50% to-white py-4 hover:bg-gradient-to-r focus:bg-gradient-to-r sm:py-3"
    >
      <div className="flex items-center gap-6">
        <UserTagIcon className="text-responsive-sm" />
        <p className="text-responsive-sm">사람 태그</p>
      </div>
      <RightIcon className="text-responsive-sm" />
    </Button>
  );
}
