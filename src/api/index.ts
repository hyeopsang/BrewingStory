import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDocs,
  addDoc,
  deleteDoc,
  collection,
  doc,
  collectionGroup,
  query,
  where,
  updateDoc,
  orderBy,
  startAfter,
  limit,
  getDoc,
  setDoc
} from "firebase/firestore"; 
import { db } from "../firebase-config";
import { ReviewContent, Review} from "../types";
import { Place } from "../map/types";

interface SavePlace {
  placeUrl: string;
  placeName: string;
  placeAddress: string;
  placePhone: string;
}
// 리뷰 최신화
export const useReviews = (placeId: string) => {
  return useQuery({
    queryKey: ["reviews", placeId],
    queryFn: () => getReview(placeId),
    enabled: !!placeId,
  });
};
// 리뷰 불러오기
export const getReview = async (placeId: string): Promise<Review[]> => {
  const querySnapshot = await getDocs(
    collection(db, "reviews", placeId, "userReviews")
  );
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    placeId,
    content: doc.data().content,
    createdAt: doc.data().createdAt.toDate(), // Firestore Timestamp → JS Date 변환
    userId: doc.data().userId,
    updatedAt: doc.data().updatedAt ? doc.data().updatedAt.toDate() : undefined,
  }));
};

// 리뷰 추가
export const addReview = async ({
  placeId,
  content,
  userId,
}: {
  placeId: string;
  content: ReviewContent;
  userId: string;
}) => {
  await addDoc(collection(db, "reviews", placeId, "userReviews"), {
    content,
    createdAt: new Date(),
    userId,
  });
};
// 카페 저장 불러오기
export const getSavedPlaces = async (userId: string, lastVisibleDoc?: any) => {
  try {
    if (!userId) {
      console.error("🚨 No userId provided");
      return { savedPlaces: [], nextQuery: null };
    }

    let savedQuery = query(
      collection(db, `users/${userId}/savedPlaces`),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    if (lastVisibleDoc) {
      savedQuery = query(savedQuery, startAfter(lastVisibleDoc));
    }

    const querySnapshot = await getDocs(savedQuery);
    
    const savedPlaces = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      placeId: doc.data().placeId,
      content: doc.data().content,
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    }));

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { savedPlaces, nextQuery: lastVisible || null };
  }
  catch (error) {
    console.error("🚨 Error fetching saved places: ", error);
    return { savedPlaces: [], nextQuery: null };
  }
};

export const useUserSavedPlace = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["savedPlaces", userId], 
    queryFn: () => userId ? getSavedPlaces(userId) : Promise.resolve({ savedPlaces: [], nextQuery: null }),
    enabled: !!userId, 
  });
};

// 카페 저장
export const savePlace = async ({
  placeId,
  userId,
  content,
}: {
  placeId: string;
  userId: number;
  content: Place;
}) => {
  await setDoc(doc(db, "users", userId.toString(), "savedPlaces", placeId), {
    placeId,
    content,
    createdAt: new Date(),
  });
};
// 카페 저장 삭제
export const deleteSavedPlace = async ({
  placeId,
  userId,
}: {
  placeId: string;
  userId: number;
}) => {
  try {
    const docRef = doc(db, "users", userId.toString(), "savedPlaces", placeId);

    // 🔍 문서 존재 여부 확인
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return alert("북마크에 해당 카페가 저장되어 있지 않습니다ㅜㅜ");
    }

    // ✅ Firestore에서 문서 삭제
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Firestore에서 장소 삭제 중 오류 발생:", error);
    alert("북마크 취소를 실패 했어요ㅜㅜ")
  }
};


// 리뷰 삭제
export const deleteReview = async ({
  placeId,
  id,
}: {
  placeId: string;
  id: string;
}) => {
  await deleteDoc(doc(db, "reviews", placeId, "userReviews", id));
};

// 리뷰 수정 (repostReview → updateReview)
export const updateReview = async ({
  placeId,
  id,
  content,
}: {
  placeId: string;
  id: string;
  content: ReviewContent;
}) => {
  await updateDoc(doc(db, "reviews", placeId, "userReviews", id), {
    content,
    updatedAt: new Date(),
  });
};
// 사용자 리뷰 불러오기
export const getUserReviews = async (userId: string, lastVisibleDoc?: any) => {
  try {
    if (!userId) {
      console.error("🚨 No userId provided");
      return { reviews: [], nextQuery: null };
    }

    let reviewsQuery = query(
      collectionGroup(db, "userReviews"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    if (lastVisibleDoc) {
      reviewsQuery = query(reviewsQuery, startAfter(lastVisibleDoc));
    }

    const querySnapshot = await getDocs(reviewsQuery);

    const reviews = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      placeId: doc.ref.parent?.parent?.id,
      content: doc.data().content,
      createdAt: doc.data().createdAt,
      userId: doc.data().userId,
    }));

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { reviews, nextQuery: lastVisible || null };
  } catch (error) {
    console.error("🚨 Error fetching user reviews: ", error);
    return { reviews: [], nextQuery: null };
  }
};

// 유저 리뷰 최신화 GET
export const useUserReviews = (userId: string) => {
  return useQuery({
    queryKey: ["userReviews", userId],
    queryFn: () => getUserReviews(userId),
    enabled: !!userId,
  });
};
// 리뷰 최신화 POST
export const useMutationAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ placeId, content, userId }:{placeId: string, content: ReviewContent, userId: string}) =>
      addReview({ placeId, content, userId }),
    onSuccess: (data, variables: Review) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.placeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["userReviews", variables.userId],
      });
    },
    onError: (error) => {
      console.error(`Add Review Error: ${error}`);
    },
  });
};
// 리뷰 최신화 DELETE
export const useMutationDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ placeId, id, userId }: { placeId: string, id: string, userId: string }) => deleteReview({ placeId, id }),
    onSuccess: (data, variables: Review) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.placeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["userReviews", variables.userId],
      });
    },
    onError: (error) => {
      console.error(`Delete Review Error: ${error}`);
    },
  });
};
