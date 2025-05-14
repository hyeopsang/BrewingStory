import { PostCard } from "@molecules/post-card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useUserInfinitePosts } from "./useUserInfinitePosts";
import { useEffect } from "react";

interface User {
  id: string;
  [key: string]: any;
}

interface StateType {
  isAuthenticated: boolean;
  user: User | null;
  auth: {
    user: User | null;
  };
}

export default function FeedTab() {
  const auth = useSelector((state: StateType) => state.auth);
  const userInfo = auth.user;
  const navigate = useNavigate();

  // 유틸 함수 사용하여 게시물 및 상태 관리
  const { posts, loading, hasMore, setTarget, fetchPosts } = useUserInfinitePosts(userInfo?.id || "");
  const handleOpenPost = (postId: string) => {
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


  return (
    <article className="feed-container">
      {posts.length === 0 && !loading ? (
        <div className="empty-feed">
          <p>게시물이 없습니다.</p>
        </div>
      ) : (
        <ul className="posts-list">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              thumbnail={post.photoUrls}
              openView={() => handleOpenPost(post.id)}
            />
          ))}
        </ul>
      )}

      {/* 감지용 요소 - 스크롤 감지를 위한 타겟 */}
      {hasMore && <div ref={setTarget} style={{ height: "10px" }} />}
      
      {loading && (
        <div className="loading-indicator">
          <p>게시물을 불러오는 중...</p>
        </div>
      )}
    </article>
  );
}
