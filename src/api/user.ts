import { useQuery } from '@tanstack/react-query';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { db, storage } from '../firebase-config';
export interface UserInfo {
  userId: string;
  nickname: string;
  userImage: string;
  bio: string;
  updatedAt: Date;
}

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
