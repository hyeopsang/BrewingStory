import { LoadingIcon } from '@atoms/icons/loading-icon';
import { Swiper, SwiperSlide } from 'swiper/react';

import { PostView } from './post-view';

export const PostSwiper = ({
  handleSlideChange,
  loadPosts,
  posts,
  loading,
}) => {
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
            <LoadingIcon />
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
};
