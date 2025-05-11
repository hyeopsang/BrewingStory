import { useState } from "react";
import { Button } from "../atoms/button";
import { Text } from "../atoms/Text";
import CommentIcon from "../atoms/comment-icon";
import LikeIcon from "../atoms/like-icon";
import { LocationIcon } from "../atoms/location-icon";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";  // pagination CSS 추가
import "swiper/css/navigation"; 

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

export default function PostWide({ post } : { post : Post }){
    const [muted, setMuted] = useState(true);
    const handleChangeMuted = () => {
    setMuted(!muted)
  }
    return (
        <div className="w-full h-full relative bg-neutral-200 text-white">
            <div className="w-full h-screen flex flex-col justify-center items-center bg-black text-white">
            {post.photoUrls && post.photoUrls.length > 0 ? (
              <Swiper
                direction="horizontal"
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                className="w-full h-full" 
                pagination={{ clickable: true }}>
                {post.photoUrls.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={url}
                      alt={`photo-${index}`}
                      className="w-full h-full object-cover" 
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : null}
            {post.videoUrl ? (
                <div className="relative w-full h-full">
                    <video
                    autoPlay
                    loop
                    muted={muted}
                    playsInline
                    className="w-full h-full object-cover"
                    onClick={handleChangeMuted}
                    >
                    <source src={post.videoUrl} type="video/mp4" />
                    </video>

                    {/* 음소거 버튼 안내 */}
                    <button
                    onClick={handleChangeMuted}
                    className="absolute z-50 bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm"
                    >
                    {muted ? "🔇" : "🔊"}
                    </button>
                </div>
                ) : null}
          </div>
            <div className="absolute bottom-15 w-full px-3 z-50 h-fit flex text-xs">
                <div className="w-[calc(100%-48px)] h-35 mt-auto px-4 flex flex-col gap-4">
                    <div className=" flex items-center justify-left gap-3">
                        <div className="w-7 aspect-square bg-white rounded-full"></div>
                        <Text size="responsive-sm" weight={"semibold"}>dbtkdguq3</Text>
                        <Button className="px-2 py-0.5 border border-white rounded-full responsive-xs">팔로잉</Button>
                    </div>
                    <Text size="responsive-xs">감성이 넘치는 카페에요</Text>
                </div>
                <div>
                    <ul className="w-fit flex flex-col justify-center gap-6">
                        <li className="flex flex-col justify-center items-center">
                            <LikeIcon className="w-7 h-7" />
                            <Text size="responsive-xs" className="pt-1">0</Text>
                        </li>
                        <li className="flex flex-col justify-center items-center">
                            <CommentIcon className="w-7 h-7" />
                            <Text size="responsive-xs" className="pt-1">0</Text>
                        </li>
                        <li className="flex flex-col justify-center items-center">
                            <LocationIcon className="w-9 h-9" />
                        </li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
