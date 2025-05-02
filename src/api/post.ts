import { useQuery } from "@tanstack/react-query";
import {
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
  startAfter
} from "firebase/firestore"; 
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase-config";

export type MediaType = Blob | ArrayBuffer | Uint8Array<ArrayBufferLike>;

export interface Media {
  photos?: MediaType[];
  video?: MediaType;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  placeId: number;
  username: string;
  content: string;
  likes: number;
  likedByCurrentUser: boolean;
  comments: Comment[];
  photoUrls?: string[];
  videoUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

export const uploadMedia = async (
    userId: string,
    media: Media
  ): Promise<{ photoUrls?: string[]; videoUrl?: string }> => {
    const result: { photoUrls?: string[]; videoUrl?: string } = {};
  
    if (media.photos && media.photos.length > 0) {
      if (media.photos.length > 5) throw new Error("사진은 최대 5장까지만 허용됩니다.");
  
      const photoUrls = await Promise.all(
        media.photos.map(async (photo, i) => {
          const photoRef = ref(storage, `user/${userId}/photos/photo_${Date.now()}_${i}`);
          await uploadBytes(photoRef, photo);
          return await getDownloadURL(photoRef);
        })
      );
  
      result.photoUrls = photoUrls;
    }
  
    if (media.video) {
      const videoRef = ref(storage, `user/${userId}/video/video_${Date.now()}`);
      await uploadBytes(videoRef, media.video);
      result.videoUrl = await getDownloadURL(videoRef);
    }
  
    return result;
  };


  export const createPost = async (
    userId: string,
    post: Omit<Post, "id" | "createdAt">,
    media: Media
  ): Promise<void> => {
    const newDocRef = doc(collection(db, "post")); 
    const id = newDocRef.id;
    const createdAt = new Date().toISOString();
  
    const { photoUrls, videoUrl } = await uploadMedia(userId, media);
  
    const newPost: Post = {
      id,
      userId,
      createdAt,
      ...post,
      photoUrls,
      videoUrl,
    };
  
    await setDoc(newDocRef, newPost);
  };

  
export const updatePost = async (
    postId: string,
    post: Partial<Post>,
    media: Media
  ): Promise<void> => {
    const docRef = doc(db, "post", postId);
    const updateData: Record<string, any> = { ...post };
  
    const { photoUrls, videoUrl } = await uploadMedia(post.userId, media);
    if (photoUrls) updateData.photoUrls = photoUrls;
    if (videoUrl) updateData.videoUrl = videoUrl;
  
    await updateDoc(docRef, updateData);
  };

  let lastVisibleDoc: any = null; // 마지막으로 불러온 문서의 참조
let postsBuffer: Post[] = []; // 미리 로드할 데이터를 저장하는 버퍼

// 하나씩 불러오는 함수
export const getNextPost = async (): Promise<Post | null> => {
  // 이미 미리 로드된 데이터가 있으면 바로 반환
  if (postsBuffer.length > 0) {
    const post = postsBuffer.shift(); // 버퍼에서 하나를 꺼내서 반환
    return post ?? null;
  }

  let q = query(collection(db, "post"), orderBy("createdAt", "desc"), limit(1)); 

  if (lastVisibleDoc) {
    q = query(q, startAfter(lastVisibleDoc)); // 마지막으로 가져온 문서 이후의 데이터를 가져옵니다
  }

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const post: Post = snapshot.docs[0].data() as Post;
  lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1]; // 마지막 문서를 업데이트

  // 다음 하나의 게시물을 미리 로드하여 버퍼에 저장
  postsBuffer.push(...await loadNextPost());

  return post;
};

// 다음 하나의 게시물을 미리 로드하는 함수
const loadNextPost = async (): Promise<Post[]> => {
  let q = query(collection(db, "post"), orderBy("createdAt", "desc"), limit(1));

  if (lastVisibleDoc) {
    q = query(q, startAfter(lastVisibleDoc)); // 마지막으로 가져온 문서 이후의 데이터를 가져옵니다
  }

  const snapshot = await getDocs(q);

  const posts: Post[] = [];
  snapshot.forEach((doc) => posts.push(doc.data() as Post));

  lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1]; // 마지막 문서를 업데이트
  return posts;
};

  export const getPostsByPlaceId = async (placeId: number): Promise<Post[]> => {
    const q = query(
      collection(db, "post"),
      where("placeId", "==", placeId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const posts: Post[] = [];
    snapshot.forEach((doc) => posts.push(doc.data() as Post));
    return posts;
  };