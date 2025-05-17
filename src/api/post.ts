// ✅ createPost.ts
import { useQuery } from '@tanstack/react-query';
import {
  arrayRemove,
  arrayUnion,
  collection,
  collectionGroup,
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
  thumbnail?: File;
}

export interface Comment {
  id?: string;
  userId: string;
  userImage: string;
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
  userImage: string;
  content: string;
  likes?: number;
  likedByCurrentUser?: string[];
  comments?: Comment[];
  photoUrls?: string[];
  thumbnail?: string;
  videoUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

// ---------- 미디어 업로드 ----------
export const uploadMedia = async (
  userId: string,
  media: Media
): Promise<{ photoUrls?: string[]; videoUrl?: string; thumbnail?: string }> => {
  const result: {
    photoUrls?: string[];
    videoUrl?: string;
    thumbnail?: string;
  } = {};

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
  if (media.thumbnail) {
    const thumbnailRef = ref(
      storage,
      `user/${userId}/thumbnail/photo_${Date.now()}`
    );
    await uploadBytes(thumbnailRef, media.thumbnail);
    result.thumbnail = await getDownloadURL(thumbnailRef);
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

  const { photoUrls, videoUrl, thumbnail } = await uploadMedia(userId, media);

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
    thumbnail,
    ...randomFields,
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

export const likePost = async (
  postId: string,
  userId: string
): Promise<void> => {
  const docRef = doc(db, 'post', postId);
  await updateDoc(docRef, {
    likedByCurrentUser: arrayUnion(userId),
  });
};
export const likeRemove = async (
  postId: string,
  userId: string
): Promise<void> => {
  const docRef = doc(db, 'post', postId);
  await updateDoc(docRef, {
    likedByCurrentUser: arrayRemove(userId),
  });
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
export const getPlacePosts = async (placeId: string, lastVisibleDoc?: any) => {
  try {
    if (!placeId) {
      console.error('🚨 No userId provided');
      return { posts: [], nextQuery: null };
    }

    let postsQuery = query(
      collectionGroup(db, 'post'),
      where('placId', '==', placeId),
      orderBy('createdAt', 'desc'),
      limit(9)
    );

    if (lastVisibleDoc) {
      postsQuery = query(postsQuery, startAfter(lastVisibleDoc));
    }

    const querySnapshot = await getDocs(postsQuery);

    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { posts, nextQuery: lastVisible || null };
  } catch (error) {
    console.error('🚨 Error fetching user reviews: ', error);
    return { reviews: [], nextQuery: null };
  }
};
export const useTagPosts = (placeId: string) => {
  return useQuery({
    queryKey: ['place', placeId],
    queryFn: () => getPlacePosts(placeId),
    enabled: !!placeId,
  });
};
