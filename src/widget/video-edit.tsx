import { useState, useEffect } from "react";
import { PlusSquare, X } from "lucide-react";
import { CafeAdd } from "./cafe-add";
import { CafeAddModal } from "./cafe-add-modal";
import Modal from "./modal";
import { UserTag } from "./user-tag";
import { UserTagModal } from "./user-tag-modal";
import { createPost } from "../api/post";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import LeftIcon from "../profile/left-icon";
import { VideoTrim } from "./video-trim";

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

export function VideoEdit() {
  const navigate = useNavigate();
  const auth: AuthState = useSelector((state: StateType) => state.auth);
  const userInfo = auth.user

  // Cafe, UserList 상태
  const [cafe, setCafe] = useState<Cafe>();
  const [userList, setUserList] = useState<UserInfo[]>([]);

  // content 초기화 함수
  const getInitialContent = () => ({
    userId: userInfo?.id || "",
    username: userInfo?.properties.nickname || "",
    content: "",
    place: cafe,
    tags: userList,
    createdAt: new Date().toString(),
    videoUrl: "", // 비디오 업로드 시 이 필드에 url 할당
  });

  // content 상태
  const [content, setContent] = useState<Post>(getInitialContent());

  // cafe, userList, userInfo가 바뀔 때 content 초기화
  useEffect(() => {
    setContent((prev) => ({
      ...prev,
      userId: String(userInfo?.id) || "",
      username: userInfo?.properties.nickname || "",
      place: cafe,
      tags: userList,
    }));
    // eslint-disable-next-line
  }, [userInfo, cafe, userList]);

  // 모달 상태
  const [cafeAdd, setCafeAdd] = useState(false);
  const [userTag, setUserTag] = useState(false);

  // 비디오 파일 상태
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // VideoTrim에서 비디오 파일 받아오는 콜백
  const handleVideoTrim = (file: File, url: string) => {
    setVideoFile(file);
    setVideoUrl(url);
    setContent(prev => ({ ...prev, videoUrl: url }));
  };

  // 업로드 mutation
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

  // 업로드 버튼 핸들러
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
  }

  return (
    <div className="w-full h-dvh flex flex-col px-6 bg-white">
      <div className="w-full flex justify-center items-center relative py-4 font-semibold">
        <button onClick={prev} className="w-full absolute left-0">
          <LeftIcon />
        </button>
        <p className="sm:text-base md:text-lg lg:text-xl">새 게시물</p>
      </div>

      {/* 사진 올리는 부분 대신 VideoTrim */}
      <div className="flex items-start gap-1 pb-2">
        <div className="w-full">
          <VideoTrim onTrim={handleVideoTrim} />
        </div>
      </div>

      <textarea
        placeholder="문구 추가.."
        className="w-full"
        value={content.content}
        onChange={e => {
          if (e.target.value.length <= 300) {
            setContent(prev => ({ ...prev, content: e.target.value }));
          }
        }}
        rows={10}
      />
      <div className="text-right text-xs text-gray-500 pb-2">
        {content.content.length} / {300}자
      </div>

      <CafeAdd onOpen={() => setCafeAdd(true)} />
      {cafe ? <p className="w-fit px-3 py-2 bg-neutral-100 rounded-xl">{cafe.displayName}</p> : null}
      <UserTag onOpen={() => setUserTag(true)} />
      <ul className="flex justify-start items-center gap-2">
        {userList.map((e, id) => (
          <li className="w-fit px-3 py-2 bg-neutral-100 rounded-xl" key={id}>{e.nickname}</li>
        ))}
      </ul>

      <button
        onClick={handleUpload}
        className="mt-4 sm:text-sm md:text-base lg:text-lg sm:py-2 md:py-2 lg:py-3 bg-[#232323] text-white rounded-lg hover:bg-blue-600"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "업로드 중..." : "완료"}
      </button>

      {userTag && (
        <Modal onClose={() => setUserTag(false)}>
          <UserTagModal onClose={() => setUserTag(false)} tag={setUserList}/>
        </Modal>
      )}
      {cafeAdd && (
        <Modal onClose={() => setCafeAdd(false)}>
          <CafeAddModal onClose={() => setCafeAdd(false)} cafeSetting={setCafe}/>
        </Modal>
      )}
    </div>
  );
}
