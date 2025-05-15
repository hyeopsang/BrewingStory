import { useInfiniteScroll } from '@utils/useInfiniteScroll';
import { useCallback, useEffect, useState } from 'react';
import { getUserPosts, useUserPosts } from 'src/api';

export function useUserInfinitePosts(userId: string) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const { data: postList, isLoading, error } = useUserPosts(userId);

  useEffect(() => {
    if (postList) {
      setPosts(postList.posts); // 첫 번째 페이지 로드
      setLastDoc(postList.nextQuery); // 다음 쿼리 설정
    }
  }, [postList]);
  console.log(isLoading)
  const fetchPosts = useCallback(async () => {
    if (!userId || loading || !hasMore) return;

    setLoading(true);
    try {
      const { posts, nextQuery } = await getUserPosts(String(userId), lastDoc);
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
    if (userId) fetchPosts();
  }, []);
  const { setTarget } = useInfiniteScroll({
    enabled: hasMore && !loading && !!userId,
    onIntersect: fetchPosts,
  });
  console.log(posts);
  return {
    posts,
    isLoading,
    error,
    hasMore,
    setTarget,
    fetchPosts,
  };
}
