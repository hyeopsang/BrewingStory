import { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { useUserInfinitePosts } from "./useUserInfinitePosts";
import PostView from "@molecules/post-view";

export const FeedView = () => {
  const { postId } = useParams();
  const location = useLocation();
  const { index = 0, userId } = (location.state as { index?: number; userId?: string }) || {};

  // 유틸 함수 사용하여 게시물 및 상태 관리
  const { posts, loading, hasMore, setTarget } = useUserInfinitePosts(userId);

  return (
    <article>
      {/* 해당 index에 해당하는 포스트만 렌더링 */}
      {posts.length > 0 && (
        <PostView key={posts[index]?.id} post={posts[index]} />
      )}

      {hasMore && <div ref={setTarget} style={{ height: "1px" }} />}
      {loading && <p>불러오는 중...</p>}
    </article>
  );
};
