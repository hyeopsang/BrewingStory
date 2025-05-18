import { getComment } from '@api/comment';
import { EmptyState } from '@molecules/shared/empty-state';
import { useEffect, useState } from 'react';
import { Comment } from 'src/types/post';

import { CommentInput } from './comment-input';
import { CommentList } from './comment-list';

interface CommentContainerProps {
  postId: string;
}

export const CommentContainer = ({ postId }: CommentContainerProps) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
