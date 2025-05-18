import { useQuery } from '@tanstack/react-query';
import {
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { UserInfo } from 'src/types/user';

import { db, storage } from '../firebase-config';

export const getUser = async (userId: string): Promise<UserInfo | null> => {
  const docRef = doc(db, 'user', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { userId: docSnap.id, ...docSnap.data() } as UserInfo & {
      userId: string;
    };
  }
  return null;
};

export const useUser = (userId: string) => {
  return useQuery<UserInfo | null>({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    select: (data) => data,
  });
};
export const updateUser = async (
  userId: string,
  updatedFields: Partial<UserInfo>,
  userImage?: Blob
): Promise<void> => {
  const docRef = doc(db, 'user', userId);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: Record<string, any> = { ...updatedFields };

  if (userImage) {
    const storageRef = ref(storage, `user/${userId}/profile`);
    await uploadBytes(storageRef, userImage);
    const downloadUrl = await getDownloadURL(storageRef);
    updateData.profileImageUrl = downloadUrl;
  }

  if (Object.keys(updateData).length === 0) return;
  await setDoc(docRef, updateData, { merge: true });
};

export const deleteUser = async (userId: string) => {
  const docRef = doc(db, 'user', userId, 'userInfo');
  await deleteDoc(docRef);
};
// 팔로우 관련 api 로직
export const followUser = async (
  currentUserId: string,
  targetUserId: string
): Promise<void> => {
  if (currentUserId === targetUserId) return;

  const followingRef = doc(
    db,
    'user',
    currentUserId,
    'following',
    targetUserId
  );
  const followerRef = doc(db, 'user', targetUserId, 'followers', currentUserId);

  await Promise.all([
    setDoc(followingRef, { followedAt: new Date() }),
    setDoc(followerRef, { followedAt: new Date() }),
  ]);
};

export const unfollowUser = async (
  currentUserId: string,
  targetUserId: string
): Promise<void> => {
  if (currentUserId === targetUserId) return;

  const followingRef = doc(
    db,
    'user',
    currentUserId,
    'following',
    targetUserId
  );
  const followerRef = doc(db, 'user', targetUserId, 'followers', currentUserId);

  await Promise.all([deleteDoc(followingRef), deleteDoc(followerRef)]);
};

export const isFollowing = async (
  currentUserId: string,
  targetUserId: string
): Promise<boolean> => {
  const docRef = doc(db, 'user', currentUserId, 'following', targetUserId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

// 사용자 게시물 관련 api 로직
export const getUserPosts = async (userId: string, lastVisibleDoc?: any) => {
  try {
    if (!userId) {
      console.error('🚨 No userId provided');
      return { posts: [], nextQuery: null };
    }

    let postsQuery = query(
      collectionGroup(db, 'post'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(10)
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

export const useUserPosts = (userId: string) => {
  return useQuery({
    queryKey: ['post', userId],
    queryFn: () => getUserPosts(userId),
    enabled: !!userId,
  });
};

export const getTagPosts = async (userId: string, lastVisibleDoc?: any) => {
  try {
    if (!userId) {
      console.error('🚨 No userId provided');
      return { posts: [], nextQuery: null };
    }

    let postsQuery = query(
      collectionGroup(db, 'post'),
      where('tag', 'array-contains', userId),
      orderBy('createdAt', 'desc'),
      limit(10)
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
export const useTagPosts = (userId: string) => {
  return useQuery({
    queryKey: ['tag', userId],
    queryFn: () => getTagPosts(userId),
    enabled: !!userId,
  });
};
