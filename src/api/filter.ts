import { useQuery } from "@tanstack/react-query";
import {
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  setDoc
} from "firebase/firestore"; 
import { db } from "../firebase-config";

export const updateFilter = async (userId: string, filter: string[]) => {
  const docRef = doc(db, "user", userId, "filter");
  await setDoc(docRef, { filter });
}
