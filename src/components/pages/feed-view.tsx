/*
Swiper 인스턴스 저장하기

jsx
const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
Swiper 인스턴스를 상태로 저장해서 나중에도 접근할 수 있게 했습니다.

이동 여부 추적하기

jsx
const [hasNavigated, setHasNavigated] = useState(false);
이미 슬라이드 이동을 했는지 추적하는 상태를 추가해 중복 이동을 방지했습니다.

useEffect로 의존성 관리하기

jsx
useEffect(() => {
  if (swiperInstance && posts.length > 0 && postIndex !== undefined && !hasNavigated) {
    // 코드 생략...
  }
}, [swiperInstance, posts, postIndex, hasNavigated]);
필요한 모든 조건(Swiper 인스턴스와 게시물 데이터)이 준비되었을 때만 슬라이드 이동이 실행되도록 했습니다.

약간의 지연 추가하기

jsx
setTimeout(() => {
  swiperInstance.slideTo(postIndex);
  setHasNavigated(true);
}, 100);
작은 시간 지연을 추가하여 Swiper가 완전히 초기화된 후에 슬라이드 이동이 실행되도록 했습니다.

이 방법은 컴포넌트의 라이프사이클과 데이터 로딩 시점을 더 잘 관리하여, 사용자가 클릭한 게시물 인덱스로 정확히 이동할 수 있도록 해줍니다.

React에서 컴포넌트 렌더링과 Swiper 같은 외부 라이브러리의 초기화는 비동기적으로 발생합니다. 특히:

컴포넌트가 렌더링됨

Swiper가 초기화됨

데이터가 로드됨

슬라이드들이 DOM에 그려짐
*/

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
  const [hasNavigated, setHasNavigated] = useState(false);

  const { posts, loading, hasMore, setTarget } = useUserInfinitePosts(
    userInfo?.id
  );

  // Effect to handle navigation after both swiper and posts are ready
  useEffect(() => {
    if (
      swiperInstance &&
      posts.length > 0 &&
      postIndex !== undefined &&
      !hasNavigated
    ) {
      // Add a small delay to ensure Swiper is fully initialized
      setTimeout(() => {
        console.log(`Navigating to slide ${postIndex}`);
        swiperInstance.slideTo(postIndex);
        setHasNavigated(true);
      }, 100);
    }
  }, [swiperInstance, posts, postIndex, hasNavigated]);

  return (
    <article>
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        style={{ height: '100vh' }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          console.log('Swiper initialized');
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
