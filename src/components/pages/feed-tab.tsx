import { PostCard } from '@molecules/post-card';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { useUserInfinitePosts } from './useUserInfinitePosts';

interface User {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface StateType {
  isAuthenticated: boolean;
  user: User | null;
  auth: {
    user: User | null;
  };
}

export function FeedTab() {
  const auth = useSelector((state: StateType) => state.auth);
  const userInfo = auth.user;
  const navigate = useNavigate();
  const { posts, loading, hasMore, setTarget } = useUserInfinitePosts(
    userInfo?.id
  );
  const handleOpenPost = (_postId: string) => {
    navigate('/post-view');
  };
  // No user ID available
  if (!userInfo?.id) {
    return (
      <article className="feed-container">
        <p>로그인이 필요합니다.</p>
      </article>
    );
  }
  console.log(posts);
  return (
    <article className="feed-container">
      {posts.length === 0 && !loading ? (
        <div className="empty-feed">
          <p>게시물이 없습니다.</p>
        </div>
      ) : (
        <ul className="posts-list">
          {posts.map((post, idx) => (
            <PostCard
              key={post.id}
              thumbnail={post.photoUrls}
              openView={() => navigate('/post-view', { state: { index: idx } })}
            />
          ))}
        </ul>
      )}

      {/* 감지용 요소 - 스크롤 감지를 위한 타겟 */}
      {hasMore && <div ref={setTarget} style={{ height: '10px' }} />}

      {loading && (
        <div className="loading-indicator">
          <p>게시물을 불러오는 중...</p>
        </div>
      )}
    </article>
  );
}
