import { EmptyState } from '@molecules/empty-state';
import { PostCard } from '@molecules/post-card';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { useUserInfinitePosts } from './useUserInfinitePosts';

interface UserInfo {
  userId: string;
  nickname: string;
  bio: string;
  updatedAt: Date;
}
interface StateType {
  isAuthenticated: boolean;
  user: UserInfo | null;
  auth: {
    user: UserInfo | null;
  };
}

export function FeedTab() {
  const auth = useSelector((state: StateType) => state.auth);
  const userInfo = auth.user;
  const navigate = useNavigate();
  const { posts, loading, hasMore, setTarget } = useUserInfinitePosts(
    userInfo?.userId
  );
  if (!userInfo?.userId) {
    return (
      <article className="feed-container">
        <p>로그인이 필요합니다.</p>
      </article>
    );
  }
  console.log(posts);
  return (
    <section className='w-full h-full'>
      {posts.length === 0 && !loading ? (
        <EmptyState />
      ) : (
        <article className="w-full">
          <ul className="grid w-full grid-cols-3">
            {posts.map((post, idx) => (
              <PostCard
                key={idx}
                photoUrls={post.photoUrls?.[0]}
                thumbnail={post.thumbnail}
                openView={() =>
                  navigate('/post-view', { state: { index: idx } })
                }
              />
            ))}
          </ul>

          {hasMore && <div ref={setTarget} style={{ height: '10px' }} />}

          {loading && (
            <div className="loading-indicator">
              <p>게시물을 불러오는 중...</p>
            </div>
          )}
        </article>
      )}
    </section>
  );
}
