import { getPlacePosts } from '@api/post';
import { useInfiniteScroll } from '@utils/useInfiniteScroll';
import { useCallback, useEffect, useState } from 'react';

export const usePlaceInfinitePosts = (placeId: string) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<any>(null);

  const fetchPosts = useCallback(async () => {
    if (!placeId || loading || !hasMore) return;

    setLoading(true);
    try {
      const { posts, nextQuery } = await getPlacePosts(placeId, lastDoc);
      setPosts((prev) => [...prev, ...posts]);
      setLastDoc(nextQuery);
      setHasMore(!!nextQuery); // 다음 커서가 없으면 더 이상 없음
    } catch (error) {
      console.error('게시물 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  }, [placeId, lastDoc, loading, hasMore]);

  useEffect(() => {
    if (placeId && posts.length === 0 && hasMore) {
      fetchPosts();
    }
  }, []);

  useEffect(() => {
    setPosts([]);
    setLastDoc(null);
    setHasMore(true);
    fetchPosts();
  }, [placeId]);

  const { setTarget } = useInfiniteScroll({
    enabled: hasMore && !loading && !!placeId,
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
};
