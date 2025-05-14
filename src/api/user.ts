import { useQuery } from '@tanstack/react-query';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { db, storage } from '../firebase-config';
interface UserInfo {
  nickname: string;
  bio: string;
  updatedAt: Date;
}

export const getAllUser = async (text: string) => {
  const userRef = doc(db, 'users', text);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserInfo;
  }
  return null;
};

export const getUser = async (userId: string): Promise<UserInfo | null> => {
  const docRef = doc(db, 'user', userId, 'userInfo');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserInfo;
  }
  return null;
};
export const useUser = (userId: string) => {
  return useQuery<UserInfo | null>({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
};
// Partial<T>로 모든 필드 값을 Optinal로 변경
export const updateUser = async (
  userId: string,
  updatedFields: Partial<UserInfo>,
  userImage?: Blob
): Promise<void> => {
  const docRef = doc(db, 'users', userId);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: Record<string, any> = { ...updatedFields };

  if (userImage) {
    const storageRef = ref(storage, `user/${userId}/profile`);
    await uploadBytes(storageRef, userImage);
    const downloadUrl = await getDownloadURL(storageRef);
    updateData.profileImageUrl = downloadUrl;
  }

  if (Object.keys(updateData).length === 0) return;
  // merge: firebase 변경된 필드만 업데이트
  await setDoc(docRef, updateData, { merge: true });
};

export const deleteUser = async (userId: string) => {
  const docRef = doc(db, 'user', userId, 'userInfo');
  await deleteDoc(docRef);
};
