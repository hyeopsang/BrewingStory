import { deleteComment } from '@api/comment';
import { Comment } from '@api/comment';
import { Button } from '@atoms/elements/button';
import { useSelector } from 'react-redux';
interface CommentItemProps {
  comment: Comment;
}

interface User {
  id: string;
  [key: string]: any;
}

interface StateType {
  isAuthenticated: boolean;
  user: User | null;
  auth: {
    user: User | null;
  };
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
