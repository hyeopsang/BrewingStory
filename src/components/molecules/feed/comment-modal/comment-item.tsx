import { deleteComment } from '@api/comment';
import { Button } from '@atoms/elements/button';
import { useSelector } from 'react-redux';
import { StateType } from 'src/types/auth';
import { Comment } from 'src/types/post';
interface CommentItemProps {
  comment: Comment;
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  const auth = useSelector((state: StateType) => state.auth);
  const userInfo = auth?.user || null;
  const handleClickDelete = async () => {
    if (comment.userId !== userInfo?.userId) return;
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      deleteComment(comment.postId, comment.id);
    } catch (err) {
      console.log(err, '삭제에 실패했습니다.');
      throw new Error('삭제에 실패했습니다.');
    }
  };
  return (
    <li>
      <p>{comment.content}</p>
      <Button onClick={handleClickDelete}>삭제</Button>
    </li>
  );
};
