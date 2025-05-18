import { PostColumn } from '@molecules/shared/post-column';
import { useUserInfinitePosts } from '@utils/useUserInfinitePosts';
import { useSelector } from 'react-redux';

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
  const { posts, loading, hasMore, setTarget } = useUserInfinitePosts(
    userInfo?.userId
  );
  return (
    <section className="w-full">
      <PostColumn
        posts={posts}
        setTarget={setTarget}
        loading={loading}
        hasMore={hasMore}
      />
    </section>
  );
}
