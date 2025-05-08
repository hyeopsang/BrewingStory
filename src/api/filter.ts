import { useQuery } from "@tanstack/react-query";
import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore"; 
import { db } from "../firebase-config";

export const getFilter = async (userId: string): Promise<string[] | null> => {
  const docRef = doc(db, "user", userId, "filter");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data() as { filter?: string[] };
    return data?.filter ?? null;
  } else {
    return null;
  }
};

export const useFilter = (userId: string) => {
  return useQuery<string[] | null>({
    queryKey: ["filter", userId],
    queryFn: () => getFilter(userId),
    enabled: !!userId,
  });
};
// merge: firebase 변경된 필드만 업데이트
export const updateFilter = async (userId: string, filter: string[]) => {
  const docRef = doc(db, "user", userId, "filter");
  await setDoc(docRef, { filter }, { merge: true });
};
