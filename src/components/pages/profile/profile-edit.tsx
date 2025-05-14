import { updateUser } from '@api/user';
import { Button } from '@atoms/elements/button';
import { Input } from '@atoms/elements/Input';
import { LeftIcon } from '@atoms/icons/left-icon';
import { useMutation } from '@tanstack/react-query';
import { formattedImage } from '@utils/formattedImage';
// textarea maxlength 한글 입력에 대한 에러, slice를 이용해서 실시간으로 글자 길이 제한.
// 평상시 rows=1, 줄이 내려갈때 rows=2로 자동 변경.
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
interface UserInfo {
  nickName: string;
  bio: string;
  updatedAt: Date;
}

interface User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
export function ProfileEdit() {
  const auth: AuthState = useSelector((state: StateType) => state.auth);
  const userInfo = auth.user?.properties || null;
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [bio, setBio] = useState<string>('');
  const [nickName, setNickName] = useState<string>('');
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState('');
  const handleBioChange = (bio: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = bio.target.value;

    const trimmed = value.length > 40 ? value.slice(0, 40) : value;
    setBio(trimmed);

    if (bioRef.current) {
      bioRef.current.rows = 1;

      const textarea = bioRef.current;
      const lineHeight = Number.parseInt(
        getComputedStyle(textarea).lineHeight,
        10
      );
      const currentRows = Math.floor(textarea.scrollHeight / lineHeight);

      textarea.rows = currentRows > 1 ? 2 : 1;
    }
  };

  const handleImageChange = async (
    image: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = image.target.files?.[0];
    if (file) {
      try {
        const formatted = await formattedImage(file);
        setProfileImage(formatted);
      } catch (err) {
        console.error('이미지 포맷 변환 실패:', err);
      }
    }
  };

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const nickName = formData.get('nickName');
      const bio = formData.get('bio');
      // Partial<T>로 필드 값을 Optinal로 변경

      const payload: Partial<UserInfo> = {};

      if (typeof nickName === 'string' && nickName.trim()) {
        payload.nickName = nickName.trim();
      }
      if (typeof bio === 'string' && bio.trim()) {
        payload.bio = bio.trim();
      }

      payload.updatedAt = new Date();

      await updateUser(userInfo.id, payload, profileImage || undefined);
    },
    onSuccess: () => setMessage('프로필 업데이트 완료'),
    onError: (err) => setMessage(`${err.message}`),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate(formData);
  };

  return (
    <section className="flex h-full w-full flex-col bg-white px-[5%] pb-3 text-center">
      <Link to="/profile" className="py-3">
        <LeftIcon />
      </Link>

      <form
        className="max-w-mobile my-auto flex w-full flex-col gap-2 px-[5%]"
        onSubmit={handleSubmit}
      >
        <div className="relative mx-auto aspect-square w-20 overflow-hidden rounded-full bg-gray-200">
          <img
            src={profileImage ? URL.createObjectURL(profileImage) : undefined}
            alt="프로필 이미지"
            className="h-auto w-full object-cover"
          />
          <label
            htmlFor="profileImage"
            className="absolute bottom-0 left-0 w-full bg-[#232323]/50 py-1 text-xs text-white"
          >
            편집
          </label>
          <Input
            title="편집"
            inputType="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="pt-4">
          <label htmlFor="nickname" className="pb-2 text-sm font-semibold">
            프로필 이름
          </label>
          <Input
            inputType="text"
            id="nickname"
            name="nickname"
            className="w-full border-b border-[#232323] py-2 text-sm focus:outline-none"
            placeholder="최대 20자 이내로 작성해 주세요."
            maxLength={20}
            value={nickName}
            onChange={(text) => setNickName(text.target.value)}
          />
          <p className="ml-auto w-fit pt-1 text-xs">{nickName.length}/20</p>
        </div>

        <div>
          <label htmlFor="bio" className="block pb-2 text-sm font-semibold">
            내 프로필 소개
          </label>
          <textarea
            id="bio"
            name="bio"
            className="h-auto w-full resize-none overflow-hidden border-b border-[#232323] py-2 text-sm focus:outline-none"
            value={bio}
            onChange={handleBioChange}
            ref={bioRef}
            rows={1}
          />
          <p className="ml-auto w-fit pt-1 text-xs">{bio.length}/40</p>
        </div>
      </form>
      <Button
        size="full"
        color="black"
        className="mx-auto mt-auto rounded-[10px] text-sm"
      >
        완료
      </Button>
      {message}
    </section>
  );
}
