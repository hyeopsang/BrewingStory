import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../atoms/button";
import CommentIcon from "../atoms/comment-icon";
import LikeIcon from "../atoms/like-icon";
import { LocationIcon } from "../atoms/location-icon";
import "swiper/css";
import "swiper/css/pagination"; // pagination CSS 추가
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

export default function PostWide({ post }: { post: Post }) {
	const [muted, setMuted] = useState(true);
	const handleChangeMuted = () => {
		setMuted(!muted);
	};

	return (
		<div className="relative h-full w-full bg-neutral-200 text-white">
			<div className="flex h-screen w-full flex-col items-center justify-center bg-black text-white">
				{post.photoUrls && post.photoUrls.length > 0 ? (
					<Swiper
						direction="horizontal"
						slidesPerView={1}
						spaceBetween={0}
						loop={true}
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

						{/* 음소거 버튼 안내 */}
						<button
							onClick={handleChangeMuted}
							className="absolute right-4 bottom-4 z-50 rounded bg-black/50 px-3 py-1 text-sm text-white"
						>
							{muted ? "🔇" : "🔊"}
						</button>
					</div>
				) : null}
			</div>
			<div className="absolute bottom-15 z-50 flex h-fit w-full px-3 text-xs">
				<div className="mt-auto flex h-35 w-[calc(100%-48px)] flex-col gap-4 px-4">
					<div className=" justify-left flex items-center gap-3">
						<div className="aspect-square w-7 rounded-full bg-white" />
						<p className="text-responsive-xs">gonggong</p>
						<Button className="responsive-xs rounded-full border border-white px-2 py-0.5">
							팔로잉
						</Button>
					</div>
					<p className="responsive-xs">감성이 넘치는 카페에요</p>
				</div>
				<div>
					<ul className="flex w-fit flex-col justify-center gap-6">
						<li className="flex flex-col items-center justify-center">
							<LikeIcon className="h-7 w-7" />
							<p className="responsive-xs pt-1">0</p>
						</li>
						<li className="flex flex-col items-center justify-center">
							<CommentIcon className="h-7 w-7" />
							<p className="responsive-xs pt-1">0</p>
						</li>
						<li className="flex flex-col items-center justify-center">
							<LocationIcon className="h-9 w-9" />
						</li>
						<li />
					</ul>
				</div>
			</div>
		</div>
	);
}
