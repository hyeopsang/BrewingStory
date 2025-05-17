import { createPost } from '@api/post';
import { Button } from '@atoms/elements/button';
import { BackButton } from '@molecules/back-button';
import { CafeAdd } from '@molecules/cafe-add';
import { UserTag } from '@molecules/user-tag';
import { CafeAddModal } from '@organisms/add-post/cafe-add-modal';
import { UserTagModal } from '@organisms/add-post/user-tag-modal';
import { VideoTrim } from '@organisms/add-post/video-trim';
import { useMutation } from '@tanstack/react-query';
import { Modal } from '@template/modal';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface Cafe {
  id: string;
  displayName: string;
}
interface UserInfo {
  userId: string;
  nickname: string;
  bio: string;
  updatedAt: Date;
}
export interface Comment {
  id: string;
  userId: string;
  userImage: string;
  username: string;
  content: string;
  createdAt: string;
}
export interface Post {
  id?: string;
  userId: string;
  userImage: string;
  place?: Cafe;
  tags: UserInfo[];
  username: string;
  content: string;
  likes?: number;
  likedByCurrentUser?: string[];
  comments?: Comment[];
  photoUrls?: string[];
  videoUrl?: string;
  thumbnail?: string;
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

interface AuthState {
  user: UserInfo | null;
}

export function VideoEdit() {
  const auth: AuthState = useSelector((state: StateType) => state.auth);
  const userInfo = auth.user;

  const [cafe, setCafe] = useState<Cafe>();
  const [userList, setUserList] = useState<UserInfo[]>([]);

  const getInitialContent = () => ({
    userId: userInfo?.userId || '',
    userImage: '',
    username: userInfo?.nickname || '',
    content: '',
    place: cafe,
    tags: userList,
    createdAt: new Date().toString(),
    videoUrl: '',
    thumbnail: '',
  });

  const [content, setContent] = useState<Post>(getInitialContent());

  useEffect(() => {
    setContent((prev) => ({
      ...prev,
      userId: userInfo?.userId || '',
      username: userInfo?.nickname || '',
      userImage: '',
      place: cafe,
      tags: userList,
    }));
  }, [userInfo, cafe, userList]);

  const [cafeAdd, setCafeAdd] = useState(false);
  const [userTag, setUserTag] = useState(false);
  const [videoImage, setVideoImage] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleVideoTrim = (file: File, url: string, thumbnail: File) => {
    setVideoFile(file);
    setVideoImage(thumbnail);
    setVideoUrl(url);
    setContent((prev) => ({ ...prev, url }));
  };
  const mutation = useMutation({
    mutationFn: () =>
      createPost(userInfo?.userId, content, {
        video: videoFile,
        thumbnail: videoImage,
      }),
    onSuccess: () => {
      alert('포스트가 성공적으로 업로드되었습니다!');
      setContent(getInitialContent());
      setVideoFile(null);
      setVideoUrl(null);
    },
    onError: (err) => {
      console.error('업로드 실패:', err);
      alert('업로드 중 문제가 발생했습니다.');
    },
  });

  const handleUpload = () => {
    if (!userInfo?.userId || !userInfo?.nickname) {
      alert('로그인 정보가 올바르지 않습니다.');
      return;
    }
    if (!videoFile) {
      alert('비디오를 첨부해주세요.');
      return;
    }
    if (mutation.isPending) return;
    mutation.mutate();
  };

  return (
    <div className="flex h-dvh w-full flex-col gap-4 bg-white px-6">
      <div className="relative flex w-full items-center justify-center py-4">
        <BackButton />
        <p className="text-responsive">새 게시물</p>
      </div>

      <div className="flex items-start gap-1 pb-2">
        <div className="w-full">
          <VideoTrim onTrim={handleVideoTrim} />
        </div>
      </div>

      <textarea
        placeholder="문구 추가.."
        className="text-responsive-sm w-full rounded-2xl p-4 shadow-inner"
        value={content.content}
        onChange={(text) => {
          if (text.target.value.length <= 300) {
            setContent((prev) => ({ ...prev, content: text.target.value }));
          }
        }}
        rows={12}
      />
      <div className="pb-2 text-right text-xs text-gray-500">
        {content.content.length} / {300}자
      </div>

      <div className="divide-blk/5 divide-y-2">
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
        className="text-responsive mt-auto mb-4 justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none sm:py-2 lg:py-3"
        disabled={mutation.isPending}
        size="full"
      >
        {mutation.isPending ? '업로드 중...' : '완료'}
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
