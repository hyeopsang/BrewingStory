interface PostCardProps {
  openView: () => void;
  thumbnail: string;
}

export const PostCard = ({ openView, thumbnail }: PostCardProps) => {
  return (
    <li onClick={openView}>
      <img src={thumbnail} alt="게시물 썸네일" />
    </li>
  );
};
