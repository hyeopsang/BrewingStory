import 'swiper/css';
import 'swiper/css/pagination'; // pagination CSS 추가
import 'swiper/css/navigation';

import { likePost, likeRemove } from '@api/post';
import { Button } from '@atoms/elements/button';
import { CommentIcon } from '@atoms/icons/comment-icon';
import { LeftIcon } from '@atoms/icons/left-icon';
import { LikeIcon } from '@atoms/icons/like-icon';
import { LocationIcon } from '@atoms/icons/location-icon';
import { PostLocation } from '@molecules/post-location';
import { useQueryClient } from '@tanstack/react-query';
import { Modal } from '@template/modal';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CommentWrapper } from './comment-wrapper';

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
  place?: Cafe;
  tags: UserInfo[];
  userImage: string;
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
interface StateType {
  isAuthenticated: boolean;
  user: UserInfo | null;
  auth: {
    user: UserInfo | null;
  };
}

export function PostView({ post }: { post: Post }) {
  const auth = useSelector((state: StateType) => state.auth);
  const navigate = useNavigate();

  const userInfo = auth?.user || null;
  const [muted, setMuted] = useState(true);
  const [openComment, setOpenComment] = useState(false);
  const [openLocation, setOpenLoction] = useState(false);
  const [likes, setLikes] = useState(post.likedByCurrentUser?.length || 0);
  const [likedByMe, setLikedByMe] = useState(
    post.likedByCurrentUser?.includes(userInfo?.userId) || false
  );
  const queryClient = useQueryClient();

  const handleChangeMuted = () => {
    setMuted(!muted);
  };
  const onClickLike = async () => {
    if (!userInfo || !post) return;
    const userId = post.userId;

    try {
      if (likedByMe) {
        await likeRemove(post.id, userId);
        setLikedByMe(false);
        setLikes((prev) => prev - 1);
      } else {
        await likePost(post.id, userId);
        setLikedByMe(true);
        setLikes((prev) => prev + 1);
      }

      // 서버 데이터를 백그라운드에서 다시 불러오도록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['post', userId] });
    } catch (error) {
      console.error('좋아요 처리 중 오류:', error);
    }
  };

  return (
    <div className="relative h-full w-full bg-black text-white">
      <LeftIcon
        onClick={() => navigate(-1)}
        className="fixed top-3 left-3 z-50 h-6 w-6 text-white drop-shadow"
      />
      <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-white">
        {post.photoUrls && post.photoUrls.length > 0 ? (
          <Swiper
            direction="horizontal"
            slidesPerView={1}
            spaceBetween={0}
            className="h-full w-full"
            pagination={{ clickable: true }}
          >
            {post.photoUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  alt={`photo-${index}`}
                  className="h-full w-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
        {post.videoUrl ? (
          <div className="relative h-full w-full">
            <video
              autoPlay
              muted={muted}
              playsInline
              className="h-full w-full object-cover"
              onClick={handleChangeMuted}
            >
              <source src={post.videoUrl} type="video/mp4" />
            </video>
            <button
              onClick={handleChangeMuted}
              className="absolute right-4 bottom-4 z-90 rounded bg-black/50 px-3 py-1 text-sm text-white"
            >
              {muted ? '🔇' : '🔊'}
            </button>
          </div>
        ) : null}
      </div>
      <div className="absolute bottom-15 z-50 flex h-fit w-full px-3 text-xs">
        <div className="mt-auto flex h-35 w-[calc(100%-48px)] flex-col gap-4 px-4">
          <div className="justify-left flex items-center gap-3">
            <img
              src={post.userImage}
              alt="작성자 프로필"
              className="aspect-square w-7 rounded-full bg-white drop-shadow"
            />
            <p className="text-responsive-xs cursor-pointer drop-shadow">
              {post.username}
            </p>
            <Button className="responsive-xs rounded-full border border-white px-2 py-0.5 drop-shadow">
              팔로잉
            </Button>
          </div>
          <p className="responsive-xs drop-shadow">{post.content}</p>
        </div>
        <div>
          <ul className="flex w-fit flex-col justify-center gap-6">
            <li className="flex flex-col items-center justify-center drop-shadow">
              <motion.span
                onClick={onClickLike}
                initial={false}
                animate={{ scale: likedByMe ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <LikeIcon
                  className={`h-7 w-7 cursor-pointer drop-shadow ${likedByMe ? 'text-pink-600' : 'fill-none text-white'}`}
                />
              </motion.span>
              <p className="responsive-xs pt-1 drop-shadow">{likes}</p>
            </li>
            <li className="flex flex-col items-center justify-center drop-shadow">
              <CommentIcon
                onClick={() => setOpenComment(true)}
                className="h-7 w-7 cursor-pointer drop-shadow"
              />
              <p className="responsive-xs pt-1 drop-shadow">0</p>
            </li>
            <li className="flex flex-col items-center justify-center">
              <LocationIcon className="h-9 w-9 cursor-pointer drop-shadow" />
            </li>
            <li />
          </ul>
        </div>
      </div>
      {openComment && (
        <Modal onClose={() => setOpenComment(false)}>
          <CommentWrapper postId={post.id} />
        </Modal>
      )}
      {openLocation && (
        <Modal onClose={() => setOpenLoction(false)}>
          <PostLocation />
        </Modal>
      )}
    </div>
  );
}
