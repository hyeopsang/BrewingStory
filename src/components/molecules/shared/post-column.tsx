import { LoadingIcon } from '@atoms/icons/loading-icon';
import { PostCard } from '@molecules/profile/post-card';
import { EmptyState } from '@molecules/shared/empty-state';
import { useNavigate } from 'react-router';

export const PostColumn = ({ posts, loading, hasMore, setTarget }) => {
  const navigate = useNavigate();
  return (
    <>
      {posts.length === 0 && !loading ? (
        <EmptyState />
      ) : (
        <div className="w-full">
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

          {loading && <LoadingIcon />}
        </div>
      )}
    </>
  );
};
