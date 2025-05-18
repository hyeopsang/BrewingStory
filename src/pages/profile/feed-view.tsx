import 'swiper/css';
import 'swiper/css/pagination';

import { LoadingIcon } from '@atoms/icons/loading-icon';
import { PostView } from '@molecules/shared/post-view';
import { useUserInfinitePosts } from '@utils/useUserInfinitePosts';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { StateType } from 'src/types/auth';
import { Swiper, SwiperSlide } from 'swiper/react';

export const FeedView = () => {
  const auth = useSelector((state: StateType) => state.auth);
  const userInfo = auth?.user || null;
  const location = useLocation();
  const postIndex = location.state?.index;
  const [swiperInstance, setSwiperInstance] = useState(null);

  const { posts, loading, hasMore, setTarget } = useUserInfinitePosts(
    userInfo.userId
  );

  useEffect(() => {
    if (swiperInstance && posts.length > 0 && postIndex !== undefined) {
      swiperInstance.slideTo(postIndex);
    }
  }, [swiperInstance, posts, postIndex]);

  return (
    <section>
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

      {hasMore && <div ref={setTarget} style={{ height: '1px' }} />}
    </section>
  );
};
