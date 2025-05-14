import { Button } from '@atoms/elements/button';
import { CafeIcon } from '@atoms/icons/cafe-icon';
import { RightIcon } from '@atoms/icons/right-icon';
interface CafeAddProps {
  onOpen: () => void;
}

export function CafeAdd({ onOpen }: CafeAddProps) {
  return (
    <Button
      size="full"
      onClick={onOpen}
      className="justify-between bg-white from-white via-neutral-100 via-50% to-white py-4 text-[#232323] hover:bg-gradient-to-r focus:bg-gradient-to-r sm:py-3 sm:text-base md:text-lg lg:text-xl"
    >
      <div className="flex items-center gap-6">
        <CafeIcon className="text-responsive-sm" />
        <p className="responsive-sm">카페 추가</p>
      </div>
      <RightIcon className="text-responsive-sm" />
    </Button>
  );
}
