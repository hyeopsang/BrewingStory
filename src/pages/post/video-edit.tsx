import { createPost } from '@api/post';
import { Button } from '@atoms/elements/button';
import { CafeAdd } from '@molecules/post/cafe-add';
import { CafeAddModal } from '@molecules/post/cafe-add-modal';
import { UserTag } from '@molecules/post/user-tag';
import { UserTagModal } from '@molecules/post/user-tag-modal';
import { VideoTrim } from '@molecules/post/video-trim';
import { BackButton } from '@molecules/shared/back-button';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ModalWrapper } from 'src/template/modal-wrapper';
import { AuthState, StateType } from 'src/types/auth';
import { Cafe, Post } from 'src/types/post';
import { UserInfo } from 'src/types/user';

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
        <ModalWrapper onClose={() => setUserTag(false)}>
          <UserTagModal onClose={() => setUserTag(false)} tag={setUserList} />
        </ModalWrapper>
      )}
      {cafeAdd && (
        <ModalWrapper onClose={() => setCafeAdd(false)}>
          <CafeAddModal
            onClose={() => setCafeAdd(false)}
            cafeSetting={setCafe}
          />
        </ModalWrapper>
      )}
    </div>
  );
}
