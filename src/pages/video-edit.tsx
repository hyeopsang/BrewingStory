import { useState, useEffect } from "react";
import { CafeAdd } from "../molecules/cafe-add";
import { CafeAddModal } from "../organisms/cafe-add-modal";
import Modal from "../template/modal";
import { UserTag } from "../molecules/user-tag";
import { UserTagModal } from "../organisms/user-tag-modal";
import { createPost } from "../api/post";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { LeftIcon } from "../atoms/left-icon";
import { VideoTrim } from "../organisms/video-trim";
import { Button } from "../atoms/Button";
import { TextArea } from "../atoms/TextArea";
import { Text } from "../atoms/Text";

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
  const userInfo = auth.user

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
    setContent(prev => ({ ...prev, videoUrl: url }));
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
  }

  return (
    <div className="w-full h-dvh flex flex-col gap-4 px-6 bg-white">
      <div className="w-full flex justify-center items-center relative py-4 font-semibold">
        <Button onClick={prev} className="w-full absolute left-0">
          <LeftIcon className="text-responsive-lg"/>
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
        className="w-full p-4 shadow-inner rounded-2xl text-responsive-sm"
        value={content.content}
        onChange={e => {
          if (e.target.value.length <= 300) {
            setContent(prev => ({ ...prev, content: e.target.value }));
          }
        }}
        rows={12}
      />
      <div className="text-right text-xs text-gray-500 pb-2">
        {content.content.length} / {300}자
      </div>

      <div className="divide-y-2 divide-[#232323]/5">
        <CafeAdd onOpen={() => setCafeAdd(true)} />
          {cafe ? <Text className="w-fit px-3 py-2 bg-neutral-100 rounded-xl">{cafe.displayName}</Text> : null}
          <UserTag onOpen={() => setUserTag(true)} />
          <ul className="flex justify-start items-center gap-2">
          {userList.map((e, id) => (
            <li className="w-fit px-3 py-2 bg-neutral-100 rounded-xl" key={id}>{e.nickname}</li>
          ))}
          </ul>
      </div>

      <Button
        onClick={handleUpload}
        className="justify-center mt-auto mb-4 text-responsive sm:py-2 lg:py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
        disabled={mutation.isPending}
        size="full"
      >
        {mutation.isPending ? "업로드 중..." : "완료"}
      </Button>

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
