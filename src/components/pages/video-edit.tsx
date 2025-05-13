import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createPost } from "../../api/post";
import { TextArea } from "../atoms/TextArea";
import { Button } from "../atoms/button";
import { LeftIcon } from "../atoms/left-icon";
import { CafeAdd } from "../molecules/cafe-add";
import { UserTag } from "../molecules/user-tag";
import { CafeAddModal } from "../organisms/cafe-add-modal";
import { UserTagModal } from "../organisms/user-tag-modal";
import { VideoTrim } from "../organisms/video-trim";
import Modal from "../template/modal";

interface Cafe {
	id: string;
	displayName: string;
}
interface UserInfo {
	nickname: string;
	bio: string;
	updatedAt: Date;
}
export interface Comment {
	id: string;
	userId: string;
	username: string;
	content: string;
	createdAt: string;
}
export interface Post {
	id?: string;
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
interface User {
	[key: string]: any;
}
interface StateType {
	isAuthenticated: boolean;
	user: User | null;
	auth: {
		user: User | null;
	};
}
interface AuthState {
	user: User | null;
}

export default function VideoEdit() {
	const navigate = useNavigate();
	const auth: AuthState = useSelector((state: StateType) => state.auth);
	const userInfo = auth.user;

	const [cafe, setCafe] = useState<Cafe>();
	const [userList, setUserList] = useState<UserInfo[]>([]);

	const getInitialContent = () => ({
		userId: userInfo?.id || "",
		username: userInfo?.properties.nickname || "",
		content: "",
		place: cafe,
		tags: userList,
		createdAt: new Date().toString(),
		videoUrl: "",
	});

	const [content, setContent] = useState<Post>(getInitialContent());

	useEffect(() => {
		setContent((prev) => ({
			...prev,
			userId: String(userInfo?.id) || "",
			username: userInfo?.properties.nickname || "",
			place: cafe,
			tags: userList,
		}));
	}, [userInfo, cafe, userList]);

	const [cafeAdd, setCafeAdd] = useState(false);
	const [userTag, setUserTag] = useState(false);

	const [videoFile, setVideoFile] = useState<File | null>(null);
	const [videoUrl, setVideoUrl] = useState<string | null>(null);

	const handleVideoTrim = (file: File, url: string) => {
		setVideoFile(file);
		setVideoUrl(url);
		setContent((prev) => ({ ...prev, videoUrl: url }));
	};

	const mutation = useMutation({
		mutationFn: () =>
			createPost(userInfo?.id, content, {
				video: videoFile,
			}),
		onSuccess: () => {
			alert("포스트가 성공적으로 업로드되었습니다!");
			setContent(getInitialContent());
			setVideoFile(null);
			setVideoUrl(null);
		},
		onError: (err) => {
			console.error("업로드 실패:", err);
			alert("업로드 중 문제가 발생했습니다.");
		},
	});

	const handleUpload = () => {
		if (!userInfo?.id || !userInfo?.properties.nickname) {
			alert("로그인 정보가 올바르지 않습니다.");
			return;
		}
		if (!videoFile) {
			alert("비디오를 첨부해주세요.");
			return;
		}
		if (mutation.isPending) return;
		mutation.mutate();
	};

	const prev = () => {
		navigate(-1);
	};

	return (
		<div className="flex h-dvh w-full flex-col gap-4 bg-white px-6">
			<div className="relative flex w-full items-center justify-center py-4">
				<Button onClick={prev} className="absolute left-0 w-full">
					<LeftIcon className="text-responsive-lg" />
				</Button>
				<p className="text-responsive">새 게시물</p>
			</div>

			<div className="flex items-start gap-1 pb-2">
				<div className="w-full">
					<VideoTrim onTrim={handleVideoTrim} />
				</div>
			</div>

			<TextArea
				placeholder="문구 추가.."
				className="w-full rounded-2xl p-4 text-responsive-sm shadow-inner"
				value={content.content}
				onChange={(e) => {
					if (e.target.value.length <= 300) {
						setContent((prev) => ({ ...prev, content: e.target.value }));
					}
				}}
				rows={12}
			/>
			<div className="pb-2 text-right text-gray-500 text-xs">
				{content.content.length} / {300}자
			</div>

			<div className="divide-y-2 divide-[#232323]/5">
				<CafeAdd onOpen={() => setCafeAdd(true)} />
				{cafe ? (
					<p className="w-fit rounded-xl bg-neutral-100 px-3 py-2">
						{cafe.displayName}
					</p>
				) : null}
				<UserTag onOpen={() => setUserTag(true)} />
				<ul className="flex items-center justify-start gap-2">
					{userList.map((e, id) => (
						<li className="w-fit rounded-xl bg-neutral-100 px-3 py-2" key={id}>
							{e.nickname}
						</li>
					))}
				</ul>
			</div>

			<Button
				onClick={handleUpload}
				className="mt-auto mb-4 justify-center rounded-xl bg-blue-600 text-responsive text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:py-2 lg:py-3"
				disabled={mutation.isPending}
				size="full"
			>
				{mutation.isPending ? "업로드 중..." : "완료"}
			</Button>

			{userTag && (
				<Modal onClose={() => setUserTag(false)}>
					<UserTagModal onClose={() => setUserTag(false)} tag={setUserList} />
				</Modal>
			)}
			{cafeAdd && (
				<Modal onClose={() => setCafeAdd(false)}>
					<CafeAddModal
						onClose={() => setCafeAdd(false)}
						cafeSetting={setCafe}
					/>
				</Modal>
			)}
		</div>
	);
}
