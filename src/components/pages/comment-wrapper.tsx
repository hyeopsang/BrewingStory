import { getComment } from '@api/comment';
import { Comment } from '@api/comment';
import { CommentInput } from '@molecules/comment-input';
import { EmptyState } from '@molecules/empty-state';
import { CommentList } from '@organisms/add-post/comment-list';
import { useEffect, useState } from 'react';

interface CommentWrapperProps {
  postId: string;
}

export const CommentWrapper = ({ postId }: CommentWrapperProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const fetchComment = async () => {
    if (!postId) return;
    try {
      const data = await getComment(postId);
      console.log(data);
      setComments(data);
    } catch (err) {
      console.log(err);
      throw new Error('댓글을 불러오지 못했습니다.');
    }
  };
  useEffect(() => {
    fetchComment();
  }, []);
  return (
    <>
      {comments.length > 0 ? (
        <CommentList comments={comments} />
      ) : (
        <EmptyState />
      )}
      <CommentInput postId={postId} />
    </>
  );
};
