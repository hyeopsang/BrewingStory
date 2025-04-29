import { useState, useRef } from "react";

export default function ProfileEdit() {
  const [profileImage, setProfileImage] = useState<File>(null);
  const [bio, setBio] = useState<string>("");
  
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length > 40) {
      setBio(value.slice(0, 40));
    } else {
      setBio(value);
    }
  };

  return (
    <div className="pt-[53px] text-gray-900">
      <header className="fixed top-0 left-0 w-screen text-lg font-semibold bg-white px-6 py-3 text-[#232323] border-b border-[#EDEDED] z-20 h-[52px]">
        <p className="min-w-mobile max-w-mobile mx-auto text-center">프로필 관리</p>
      </header>
      <form className="px-[5%] min-w-mobile max-w-mobile">
        <div className="w-20 aspect-square rounded-full overflow-hidden bg-gray-200 mx-auto relative">
          <img
            src={profileImage ? URL.createObjectURL(profileImage) : null}
            alt="프로필 이미지"
            className="w-full h-auto object-cover"
          />
          <label htmlFor="profileImage" className="absolute bottom-0 w-full text-center block text-xs font-normal pb-1.5 pt-1 bg-white/15">
            편집
          </label>
          <input
            title="편집"
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            className="hidden"
            
          />
        </div>
        <label htmlFor="nickname" className="block text-sm font-medium mt-4">
          프로필 이름
        </label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          className="mt-1 w-full text-sm border-b border-[#232323]"
        />
        <label htmlFor="bio" className="block text-sm font-medium mt-4">
          내 프로필 소개
        </label>
        <textarea
          id="bio"
          name="bio"
          className="p-1 block w-full h-auto text-sm text-[#232323] border-b border-[#232323] focus:outline-none resize-none overflow-hidden"
          value={bio}
          onChange={handleBioChange}
          rows={1}
        ></textarea>
        <p className="text-xs ml-auto w-fit">{bio.length}/40</p>
      </form>
    </div>
  );
}
