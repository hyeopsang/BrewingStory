import { useState, useEffect, useCallback } from "react";
import { getUserPosts } from "src/api";
import { useInfiniteScroll } from "@utils/useInfiniteScroll";

export function useUserInfinitePosts(userId: string) {
    const [posts, setPosts] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [lastDoc, setLastDoc] = useState<any>(null);

	const fetchPosts = useCallback(async () => {
		if (!userId || loading || !hasMore) return;

		setLoading(true);
		try {
			const { reviews, nextQuery } = await getUserPosts(String(userId), lastDoc);
			setPosts((prev) => [...prev, ...reviews]);
			setLastDoc(nextQuery);
			setHasMore(!!nextQuery); // 다음 커서가 없으면 더 이상 없음
		} catch (error) {
			console.error("게시물 불러오기 실패:", error);
		} finally {
			setLoading(false);
		}
	}, [userId, lastDoc, loading, hasMore]);
    useEffect(() => {
        if(userId) fetchPosts()
    }, [])
  const { setTarget } = useInfiniteScroll({
    enabled: hasMore && !loading && !!userId,
    onIntersect: fetchPosts,
  });

  return { 
    posts, 
    loading, 
    hasMore, 
    setTarget, 
    fetchPosts,
  };
}
