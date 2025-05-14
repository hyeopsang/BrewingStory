// ✅ createPost.ts
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  type OrderByDirection,
  query,
  type QueryDocumentSnapshot,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { db, storage } from '../firebase-config';
// ---------- 타입 ----------
export type MediaType = Blob | ArrayBuffer | Uint8Array<ArrayBufferLike>;

export interface Media {
  photos?: File[];
  video?: File;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

interface UserInfo {
  nickname: string;
  bio: string;
  updatedAt: Date;
}

interface Cafe {
  id: string;
  displayName: string;
}

export interface Post {
  id: string;
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

// ---------- 미디어 업로드 ----------
export const uploadMedia = async (
  userId: string,
  media: Media
): Promise<{ photoUrls?: string[]; videoUrl?: string }> => {
  const result: { photoUrls?: string[]; videoUrl?: string } = {};

  if (media.photos?.length) {
    if (media.photos.length > 5) {
      throw new Error('사진은 최대 5장까지만 업로드할 수 있습니다.');
    }

    const photoUrls = await Promise.all(
      media.photos.map(async (photo, index) => {
        const photoRef = ref(
          storage,
          `user/${userId}/photos/photo_${Date.now()}_${index}`
        );
        await uploadBytes(photoRef, photo);
        return getDownloadURL(photoRef);
      })
    );

    result.photoUrls = await Promise.all(photoUrls);
  }

  if (media.video) {
    const videoRef = ref(storage, `user/${userId}/video/video_${Date.now()}`);
    await uploadBytes(videoRef, media.video);
    result.videoUrl = await getDownloadURL(videoRef);
  }

  return result;
};

// ---------- 게시글 생성 ----------
export const createPost = async (
  userId: string,
  post: Omit<Post, 'id' | 'createdAt'>,
  media: Media
): Promise<void> => {
  const newDocRef = doc(collection(db, 'post'));
  const id = newDocRef.id;
  const createdAt = new Date().toISOString();

  const { photoUrls, videoUrl } = await uploadMedia(userId, media);

  // 랜덤 필드 생성
  const randomFields = {
    randomA: Math.floor(Math.random() * 10000),
    randomB: Math.floor(Math.random() * 10000),
    randomC: Math.floor(Math.random() * 10000),
    randomD: Math.floor(Math.random() * 10000),
    randomE: Math.floor(Math.random() * 10000),
  };

  const newPost: Post = {
    id,
    userId,
    createdAt,
    ...post,
    photoUrls,
    videoUrl,
    ...randomFields, // ✅ 랜덤 필드 추가
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeUndefined = (obj: any) =>
    Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));

  await setDoc(newDocRef, removeUndefined(newPost));
};

// ---------- 게시글 수정 ----------
export const updatePost = async (
  postId: string,
  post: Partial<Post>,
  media: Media
): Promise<void> => {
  const docRef = doc(db, 'post', postId);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: Record<string, any> = { ...post };

  const { photoUrls, videoUrl } = await uploadMedia(post.userId || '', media);
  if (photoUrls) updateData.photoUrls = photoUrls;
  if (videoUrl) updateData.videoUrl = videoUrl;

  await updateDoc(docRef, updateData);
};

// ---------- 포스트 하나씩 불러오기 ----------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lastVisibleDoc: any = null;
const postsBuffer: Post[] = [];

export const getNextPost = async (): Promise<Post | null> => {
  if (postsBuffer.length > 0) return postsBuffer.shift() ?? null;

  let q = query(collection(db, 'post'), orderBy('createdAt', 'desc'), limit(1));
  if (lastVisibleDoc) q = query(q, startAfter(lastVisibleDoc));

  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const post: Post = snapshot.docs[0].data() as Post;
  lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];

  postsBuffer.push(...(await loadNextPost()));
  return post;
};

const loadNextPost = async (): Promise<Post[]> => {
  let q = query(collection(db, 'post'), orderBy('createdAt', 'desc'), limit(1));
  if (lastVisibleDoc) q = query(q, startAfter(lastVisibleDoc));

  const snapshot = await getDocs(q);
  const posts: Post[] = snapshot.docs.map((doc) => doc.data() as Post);
  lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];

  return posts;
};
// ---------- 피드 탭 포스트 조회 ----------
export const getRandomPosts = async (
  lastViewRef?: QueryDocumentSnapshot,
  pageSize = 10
) => {
  const fields = ['randomA', 'randomB', 'randomC', 'randomD', 'randomE'];
  const sortField = fields[Math.floor(Math.random() * fields.length)];
  const sortOrder: OrderByDirection = Math.random() > 0.5 ? 'asc' : 'desc';

  const postRef = collection(db, 'post');

  const q = lastViewRef
    ? query(
        postRef,
        orderBy(sortField, sortOrder),
        startAfter(lastViewRef),
        limit(pageSize)
      )
    : query(postRef, orderBy(sortField, sortOrder), limit(pageSize));

  const snapshot = await getDocs(q);

  const list = snapshot.docs.map((doc) => ({
    ...doc.data(),
  }));

  return {
    lastViewRef: snapshot.docs[snapshot.docs.length - 1],
    list,
  };
};

// ---------- 장소별 포스트 조회 ----------
export const getPostsByPlaceId = async (placeId: number): Promise<Post[]> => {
  const q = query(
    collection(db, 'post'),
    where('place.placeId', '==', placeId),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as Post);
};
