import { useState, useEffect, useRef } from "react";
import { formattedImage } from "../profile/formattedImage";
import { PlusSquare, X } from "lucide-react";
import { CafeAdd } from "./cafe-add";
import { CafeAddModal } from "./cafe-add-modal";
import Modal from "./modal";
import { UserTag } from "./user-tag";
import { UserTagModal } from "./user-tag-modal";
import { createPost } from "../api/post";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

interface Cafe {
  placeId: string;
  name: string;
}
interface UserInfo {
  nickName: string;
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


export function PhotoEdit() {
  const auth: AuthState = useSelector((state: StateType) => state.auth);
  const userInfo = auth.user?.properties || null;

  const initialContent: Post = {
    userId: userInfo?.id,
    username: userInfo?.nickName,
    content: "",
    place: { placeId: "", name: "" },
    tags: [],
    createdAt: new Date().toString(),
  };

  const [content, setContent] = useState<Post>(initialContent);
  const [images, setImages] = useState<File[]>([]);
  const imageRef = useRef<HTMLInputElement>(null);
  const [cafeAdd, setCafeAdd] = useState(false);
  const [userTag, setUserTag] = useState(false);

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
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
    const updatedImages = images.filter((_, idx) => idx !== index);
    setImages(updatedImages);
  };

  useEffect(() => {
    return () => {
      images.forEach((file) => {
        if (file instanceof Blob) {
          URL.revokeObjectURL(URL.createObjectURL(file));
        }
      });
    };
  }, [images]);

  const mutation = useMutation({
    mutationFn: () =>
      createPost(userInfo?.id, content, {
        photos: images, // Media 타입으로 맞춰 전달
      }),
    onSuccess: () => {
      alert("포스트가 성공적으로 업로드되었습니다!");
      setContent(initialContent);
      setImages([]);
    },
    onError: (err) => {
      console.error("업로드 실패:", err);
      alert("업로드 중 문제가 발생했습니다.");
    },
  });
  

  const handleUpload = () => {
    if (images.length === 0) {
      alert("이미지를 최소 1장 이상 첨부해주세요.");
      return;
    }
    mutation.mutate();
  };

  return (
    <div className="w-full h-dvh flex flex-col gap-3 px-6 py-4 bg-white">
      <div className="flex items-start gap-1">
        <div className="overflow-x-auto flex-1" style={{ scrollbarWidth: "none" }}>
          <ul className="flex gap-3 flex-nowrap">
            <li
              onClick={() => imageRef.current?.click()}
              className="w-1/4 aspect-[9/16] text-white font-bold bg-neutral-200 py-4 button-style text-sm flex justify-center items-center gap-4 shrink-0"
            >
              <PlusSquare />
            </li>
            {images.map((file, index) => (
              <li key={index} className="relative w-1/4 aspect-[9/16] overflow-hidden shrink-0">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => deleteImage(index)}
                  className="absolute top-3 right-3 bg-neutral-900 text-white text-xs p-1 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 파일 선택 input */}
      <input
        className="hidden"
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleChangeImage}
        ref={imageRef}
        multiple
      />

      <CafeAdd onOpen={() => setCafeAdd(true)} />
      <UserTag onOpen={() => setUserTag(true)} />

      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        포스트 업로드
      </button>

      {userTag && (
        <Modal onClose={() => setUserTag(false)}>
          <UserTagModal onClose={() => setUserTag(false)} />
        </Modal>
      )}
      {cafeAdd && (
        <Modal onClose={() => setCafeAdd(false)}>
          <CafeAddModal onClose={() => setCafeAdd(false)} />
        </Modal>
      )}
    </div>
  );
}
