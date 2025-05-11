import { useEffect, useState } from "react";
import { getRandomPosts } from "../api/post";
import type { QueryDocumentSnapshot, OrderByDirection } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";  // pagination CSS 추가
import "swiper/css/navigation"; 
import PostWide from "../molecules/post-wide";

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

interface UserInfo {
  nickname: string;
  bio: string;
  updatedAt: Date;
}

interface Cafe {
  id: string;
  displayName: string;
}

export interface Post {
  id: string;
  userId: string;
  place?: Cafe;
  tags: UserInfo[];
  username: string;
  content: string;
  likes?: number;
  likedByCurrentUser?: boolean;
  comments?: Comment[];
  photoUrls?: string[];
  videoUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sortField] = useState(() => {
    const fields = ["randomA", "randomB", "randomC", "randomD", "randomE"];
    return fields[Math.floor(Math.random() * fields.length)];
  });

  const loadPosts = async () => {
  if (loading || !hasMore) return;
  setLoading(true);
  
  try {
    const response = await getRandomPosts(lastDoc, 10);
    
    if (response.list.length === 0) {
      setHasMore(false);
    } else {
      const response = await getRandomPosts(lastDoc, 10);
        if (response.list.length === 0) setHasMore(false);
        setPosts((prev) => [...prev, ...response.list as Post[]]);
      
        setLastDoc(response.lastViewRef ?? null);
    }
  } catch (error) {
    console.error("게시물 로딩 오류:", error);
  } finally {
    setLoading(false);
  }
};

    const handleSlideChange = (swiper : any) => {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.pause();
            video.muted = true;
        });
        const activeSlide = swiper.slides[swiper.activeIndex]
        const activeVideo = activeSlide.querySelector('video');

        if(activeVideo) {
            activeVideo.currentTime = 0;
            activeVideo.play();
            activeVideo.muted = false
        }
    }
  return (
    <Swiper
        onSlideChange={handleSlideChange}
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        style={{ height: "100vh" }}
        pagination={{ clickable: true }}
        onReachEnd={loadPosts}
    >
      {posts.map((post, id) => (
        <SwiperSlide key={id}>
            <PostWide  post={post}/>
        </SwiperSlide>
      ))}
      {loading && (
        <SwiperSlide>
          <div className="w-full h-screen flex justify-center items-center bg-gray-800 text-white">
            <p>로딩 중...</p>
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
}
