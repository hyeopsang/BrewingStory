// textarea maxlength 한글 입력에 대한 에러, slice를 이용해서 실시간으로 글자 길이 제한.
// 평상시 rows=1, 줄이 내려갈때 rows=2로 자동 변경.
import { useState, useRef, use } from "react";
import LeftIcon from "./left-icon";
import { Link } from "react-router";

export default function ProfileEdit() {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [bio, setBio] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const bioRef = useRef<HTMLTextAreaElement>(null); // textarea 참조

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // 글자수 제한
    const trimmed = value.length > 40 ? value.slice(0, 40) : value;
    setBio(trimmed);

    // 줄 수 계산
    if (bioRef.current) {
      bioRef.current.rows = 1; // 항상 초기화

      // 임시 텍스트 영역을 만들어서 줄 수 측정
      const textarea = bioRef.current;
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
      const currentRows = Math.floor(textarea.scrollHeight / lineHeight);

      // 실제 줄 수가 2 이상일 때만 rows 확장
      textarea.rows = currentRows > 1 ? 2 : 1;
    }
  };
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };
  return (
    <section className="w-full h-full text-center flex flex-col px-[5%] pb-3">
      <Link to="/profile" className="py-3">
        <LeftIcon />
      </Link>

      <form className="my-auto px-[5%] min-w-mobile max-w-mobile flex flex-col gap-2">
        <div className="w-20 aspect-square rounded-full overflow-hidden bg-gray-200 mx-auto relative">
          <img
            src={profileImage ? URL.createObjectURL(profileImage) : undefined}
            alt="프로필 이미지"
            className="w-full h-auto object-cover"
          />
          <label htmlFor="profileImage" className="absolute w-full py-1 bottom-0 left-0 text-xs font-normal bg-[#232323]/50 text-white">
            편집
          </label>
          <input
            title="편집"
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="pt-4">
          <label htmlFor="nickname" className="text-sm font-semibold pb-2">
            프로필 이름
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            className="py-2 w-full text-sm border-b border-[#232323] focus:outline-none"
            placeholder="최대 20자 이내로 작성해 주세요."
            maxLength={20}
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <p className="text-xs ml-auto w-fit pt-1">{nickName.length}/20</p>
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-semibold pb-2">
            내 프로필 소개
          </label>
          <textarea
            id="bio"
            name="bio"
            className="py-2 w-full h-auto text-sm border-b border-[#232323] focus:outline-none resize-none overflow-hidden"
            value={bio}
            onChange={handleBioChange}
            ref={bioRef}
            rows={1}
          ></textarea>
          <p className="text-xs ml-auto w-fit pt-1">{bio.length}/40</p>
        </div>
      </form>
      <button className="w-full bg-[#232323] text-white rounded-[10px] py-2.5 text-sm mt-auto mx-auto">완료</button>
    </section>

  );
}
