interface PostCardProps {
  openView: () => void;
  photoUrls?: string;
  thumbnail?: string;
}

export const PostCard = ({ openView, photoUrls, thumbnail }: PostCardProps) => {
  return (
    <li
      className="flex aspect-square items-center justify-center overflow-hidden"
      onClick={openView}
    >
      <img src={thumbnail ? thumbnail : photoUrls} alt="게시물 썸네일" />
    </li>
  );
};
