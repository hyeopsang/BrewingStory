import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from 'src/firebase-config';
import { Comment } from 'src/types/post';

export const createComment = async (
  postId: string,
  comment: Comment
): Promise<void> => {
  const commentRef = collection(db, 'comment', postId, 'comments');
  await addDoc(commentRef, comment);
};
export const deleteComment = async (
  postId: string,
  commentId: string
): Promise<void> => {
  const docRef = doc(db, 'comment', postId, 'comments', commentId);
  await deleteDoc(docRef);
};
export const getComment = async (postId: string): Promise<Comment[]> => {
  const commentRef = collection(db, 'comment', postId, 'comments');
  const q = query(commentRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      }) as Comment
  );
};
