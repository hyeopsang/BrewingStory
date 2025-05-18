import { PostColumn } from '@molecules/shared/post-column';
import { useTagInfinitePosts } from '@utils/useTagInfinitePosts';
import { useSelector } from 'react-redux';
import { StateType } from 'src/types/auth';

export function TagTab() {
  const auth = useSelector((state: StateType) => state.auth);
  const userInfo = auth.user;
  const { posts, loading, hasMore, setTarget } = useTagInfinitePosts(
    userInfo?.userId
  );
  console.log(posts);
  return (
    <section className="h-full w-full">
      <PostColumn
        posts={posts}
        setTarget={setTarget}
        loading={loading}
        hasMore={hasMore}
      />
    </section>
  );
}
