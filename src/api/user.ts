import { useQuery } from "@tanstack/react-query";
import {
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  setDoc
} from "firebase/firestore"; 
import { db } from "../firebase-config";

interface UserInfo {
    nickName: string;
    profileImage: string;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
}

export const addUser = async ({ userId, userInfo }:{ userId: string; userInfo: UserInfo }) => {
    await setDoc(doc(db, "user", userId, "userInfo"), {
        userId,
        userInfo,
      });
}
export const getUser = async (userId: string): Promise<UserInfo | null> => {
    const docRef = doc(db, "user", userId, "userInfo");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as UserInfo;
    } else {
        return null;
    }
}
export const useUser = (userId: string) => {
    return useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUser(userId),
        enabled: !!userId,
    });
}
export const updateUser = async (userId: string, userInfo: UserInfo) => {
    const docRef = doc(db, "user", userId, "userInfo");
    await updateDoc(docRef, { userInfo });
}
export const deleteUser = async (userId: string) => {
    const docRef = doc(db, "user", userId, "userInfo");
    await deleteDoc(docRef);
}

