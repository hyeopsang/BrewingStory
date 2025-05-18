import { createComment } from '@api/comment';
import { Button } from '@atoms/elements/button';
import { useState } from 'react';
import { useSelector } from 'react-redux';
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
export interface Comment {
  id?: string;
  postId: string;
  userId: string;
  userImage: string;
  username: string;
  content: string;
  createdAt: string;
}
interface CommentInputProps {
  postId: string;
}

export const CommentInput = ({ postId }: CommentInputProps) => {
  const auth = useSelector((state: StateType) => state.auth);
  const userInfo = auth?.user || null;
  const [comment, setComment] = useState('');
  const onSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo && !comment.trim()) return;
    const newComment: Comment = {
      userId: userInfo?.userId,
      postId: postId,
      userImage: '',
      username: userInfo?.nickname || '',
      content: comment,
      createdAt: new Date().toISOString(),
    };
    try {
      await createComment(postId, newComment);
      setComment('');
    } catch (err) {
      throw new Error(err);
    }
  };
  return (
    <form onSubmit={onSubmitComment}>
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글 달기"
      />
      <Button>댓글 달기</Button>
    </form>
  );
};
