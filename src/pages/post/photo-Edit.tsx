import { createPost } from '@api/post';
import { Button } from '@atoms/elements/button';
import { Input } from '@atoms/elements/Input';
import { CafeAdd } from '@molecules/post/cafe-add';
import { CafeAddModal } from '@molecules/post/cafe-add-modal';
import { UserTag } from '@molecules/post/user-tag';
import { UserTagModal } from '@molecules/post/user-tag-modal';
import { BackButton } from '@molecules/shared/back-button';
import { useMutation } from '@tanstack/react-query';
import { formattedImage } from '@utils/formattedImage';
import { PlusSquare, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ModalWrapper } from 'src/template/modal-wrapper';
import { StateType } from 'src/types/auth';
import { AuthState } from 'src/types/auth';
import { Post } from 'src/types/post';
import { Cafe } from 'src/types/post';
import { UserInfo } from 'src/types/user';

export function PhotoEdit() {
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
    photoUrls: [],
    thumbnail: '',
  });

  const [content, setContent] = useState<Post>(getInitialContent());

  useEffect(() => {
    setContent((prev) => ({
      ...prev,
      userId: userInfo?.userId || '',
      username: userInfo?.nickname,
      place: cafe,
      tags: userList,
    }));
  }, [userInfo, cafe, userList]);

  const [images, setImages] = useState<File[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));
    setImageURLs(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const [cafeAdd, setCafeAdd] = useState(false);
  const [userTag, setUserTag] = useState(false);

  const handleChangeImage = async (
    image: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(image.target.files || []);
    if (files.length === 0) return;

    const maxSelectable = 5 - images.length;
    if (maxSelectable <= 0) return;

    const selectedFiles = files.slice(0, maxSelectable);
    const formattedFiles = await Promise.all(
      selectedFiles.map((file) => formattedImage(file))
    );
    setImages((prev) => [...prev, ...formattedFiles]);
  };

  const deleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const mutation = useMutation({
    mutationFn: () =>
      createPost(userInfo?.userId, content, {
        photos: images,
      }),
    onSuccess: () => {
      alert('포스트가 성공적으로 업로드되었습니다!');
      setContent(getInitialContent());
      setImages([]);
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
    if (images.length === 0) {
      alert('이미지를 최소 1장 이상 첨부해주세요.');
      return;
    }
    if (mutation.isPending) return;
    mutation.mutate();
  };

  return (
    <div className="flex h-dvh w-full flex-col gap-4 bg-white px-6">
      <div className="text-responsive relative flex w-full items-center justify-center py-4">
        <BackButton />
        <p>새 게시물</p>
      </div>

      <div className="flex items-start gap-1 pb-2">
        <div
          className="flex-1 overflow-x-auto"
          style={{ scrollbarWidth: 'none' }}
        >
          <ul className="flex flex-nowrap gap-3">
            <li
              onClick={() => imageRef.current?.click()}
              className="button-style flex aspect-[9/16] w-1/4 shrink-0 items-center justify-center gap-4 rounded-2xl bg-neutral-200 py-4 font-bold text-white"
            >
              <PlusSquare />
            </li>
            {images.map((file, index) => (
              <li
                key={index}
                className="relative aspect-[9/16] w-1/4 overflow-hidden rounded-2xl"
              >
                <img
                  src={imageURLs[index]}
                  alt={`preview-${index}`}
                  className="h-full w-full object-cover"
                />
                <Button
                  onClick={() => deleteImage(index)}
                  className="bg-blk absolute top-3 right-3 rounded-full p-1 text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Input
        className="hidden"
        inputType="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleChangeImage}
        ref={imageRef}
        multiple
      />

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
