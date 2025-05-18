import { ImageIcon } from '@atoms/icons/image-icon';
import { MediaIcon } from '@atoms/icons/media-icon';
import { Link } from 'react-router';

export function UploadTemplateSelector() {
  return (
    <div className="text-blk flex h-fit w-full flex-col items-center bg-white py-6 text-sm font-bold sm:gap-2 md:gap-3 lg:gap-4">
      <h2 className="text-responsive-xs text-center">Upload</h2>
      <div className="responsive-xs items-star text-blk flex w-full flex-col font-bold">
        <Link
          to={'/edit/photo'}
          className="from-blk/10 via-blk/5 flex w-full cursor-pointer items-center gap-4 rounded via-50% to-neutral-100 transition-colors duration-300 hover:bg-gradient-to-r active:bg-gray-200 sm:px-6 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-3"
        >
          <ImageIcon />
          <p>사진 올리기</p>
        </Link>
        <Link
          to={'/edit/video'}
          className="from-blk/10 via-blk/5 flex w-full cursor-pointer items-center gap-4 rounded via-50% to-neutral-100 transition-colors duration-300 hover:bg-gradient-to-r active:bg-gray-200 sm:px-6 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-3"
        >
          <MediaIcon />
          <p>동영상 올리기</p>
        </Link>
      </div>
    </div>
  );
}
