import { Button } from '@atoms/elements/button';
import { BookMarkIcon } from '@atoms/icons/book-mark-icon';

export const PlaceSave = () => {
  return (
    <Button
      size="fit"
      outline
      className="group mt-2 rounded-full transition duration-200 hover:border-blue-500"
    >
      <BookMarkIcon className="text-neutral-400 group-hover:text-blue-500" />
      <p color="gray" className="group-hover:text-blue-500">
        저장
      </p>
    </Button>
  );
};
