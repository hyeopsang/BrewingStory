import 'swiper/css';
import 'swiper/css/pagination'; // pagination CSS 추가
import 'swiper/css/navigation';

import type { QueryDocumentSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getRandomPosts } from '../../api/post';
import { PostView } from './post-view';

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

interface UserInfo {
  userId: string;
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
  userImage: string; // ✅ 추가
  place?: Cafe;
  tags: UserInfo[];
  username: string;
  content: string;
  likes?: number;
  likedByCurrentUser?: string[];
  comments?: Comment[];
  photoUrls?: string[];
  videoUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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
        setPosts((prev) => [...prev, ...(response.list as Post[])]);

        setLastDoc(response.lastViewRef ?? null);
      }
    } catch (error) {
      console.error('게시물 로딩 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSlideChange = (swiper: any) => {
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      video.pause();
      video.muted = true;
    });
    const activeSlide = swiper.slides[swiper.activeIndex];
    const activeVideo = activeSlide.querySelector('video');

    if (activeVideo) {
      activeVideo.currentTime = 0;
      activeVideo.play();
      activeVideo.muted = false;
    }
  };
  return (
    <Swiper
      onSlideChange={handleSlideChange}
      direction="vertical"
      slidesPerView={1}
      spaceBetween={0}
      style={{ height: '100vh' }}
      pagination={{ clickable: true }}
      onReachEnd={loadPosts}
    >
      {posts.map((post, id) => (
        <SwiperSlide key={id}>
          <PostView post={post} />
        </SwiperSlide>
      ))}
      {loading && (
        <SwiperSlide>
          <div className="flex h-screen w-full items-center justify-center bg-gray-800 text-white">
            <p>로딩 중...</p>
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
}
