import { getTagPosts } from '@api/user';
import { useInfiniteScroll } from '@utils/useInfiniteScroll';
import { useCallback, useEffect, useState } from 'react';

export function useTagInfinitePosts(userId: string) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<any>(null);

  const fetchPosts = useCallback(async () => {
    if (!userId || loading || !hasMore) return;

    setLoading(true);
    try {
      const { posts, nextQuery } = await getTagPosts(userId, lastDoc);
      setPosts((prev) => [...prev, ...posts]);
      setLastDoc(nextQuery);
      setHasMore(!!nextQuery); // 다음 커서가 없으면 더 이상 없음
    } catch (error) {
      console.error('게시물 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, lastDoc, loading, hasMore]);

  useEffect(() => {
    if (userId && posts.length === 0 && hasMore) {
      fetchPosts();
    }
  }, []);

  useEffect(() => {
    setPosts([]);
    setLastDoc(null);
    setHasMore(true);
    fetchPosts();
  }, [userId]);

  const { setTarget } = useInfiniteScroll({
    enabled: hasMore && !loading && !!userId,
    onIntersect: fetchPosts,
  });
  console.log(posts);
  return {
    posts,
    loading,
    hasMore,
    setTarget,
    fetchPosts,
  };
}
