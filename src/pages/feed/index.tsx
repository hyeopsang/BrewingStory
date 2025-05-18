import 'swiper/css';
import 'swiper/css/pagination'; // pagination CSS 추가
import 'swiper/css/navigation';

import { PostSwiper } from '@molecules/shared/post-swiper';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { Post } from 'src/types/post';

import { getRandomPosts } from '../../api/post';

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
    <section>
      <PostSwiper
        posts={posts}
        handleSlideChange={handleSlideChange}
        loading={loading}
        loadPosts={loadPosts}
      />
    </section>
  );
}
