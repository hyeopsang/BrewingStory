import 'swiper/css';
import 'swiper/css/pagination';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';

import { PostView } from './post-view';
import { useUserInfinitePosts } from './useUserInfinitePosts';

interface Post {
  id: string;
  title: string;
  content: string;
}

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

export const FeedView = () => {
  const auth = useSelector((state: StateType) => state.auth);
  const userInfo = auth.user;
  const location = useLocation();
  const postIndex = location.state?.index;

  const [swiperInstance, setSwiperInstance] = useState(null);

  const { posts, loading, hasMore, setTarget } = useUserInfinitePosts(
    userInfo?.id
  );

  useEffect(() => {
    if (swiperInstance && posts.length > 0 && postIndex !== undefined) {
      swiperInstance.slideTo(postIndex);
    }
  }, [swiperInstance, posts, postIndex]);

  return (
    <article>
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        style={{ height: '100vh' }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
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

      {hasMore && <div ref={setTarget} style={{ height: '1px' }} />}
    </article>
  );
};
