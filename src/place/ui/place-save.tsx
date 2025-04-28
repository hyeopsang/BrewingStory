import { Star } from "lucide-react";
import { getSavedPlaces, savePlace, deleteSavedPlace } from "../../api"; // 삭제 기능 추가
import { Place } from "../../map/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

interface PlaceInfoProps {
  place: Place;
}

interface User {
  [key: string]: any;
}

interface StateType {
  isAuthenticated: boolean;
  user: User | null;
  auth: {
    user: User | null;
  };
}

interface AuthState {
  user: User | null;
}

export default function PlaceSave({ place }: PlaceInfoProps) {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // 중복 클릭 방지

  const auth: AuthState = useSelector((state: StateType) => state.auth);
  const userInfo = auth.user;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSavedStatus = async () => {
      if (!userInfo) return;

      try {
        const savedPlaces = await getSavedPlaces(userInfo.id);
        const alreadySaved = savedPlaces.savedPlaces.some(
          (saved) => saved.placeId === place.id
        );

        setIsSaved(alreadySaved);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedStatus();
  }, [userInfo, place.id]); // 의존성 추가

  const onClickSave = async () => {
    if (!userInfo || loading) return; // 사용자가 없거나 로딩 중이면 실행 X

    setLoading(true); // API 요청 중 중복 실행 방지

    try {
      if (isSaved) {
        await deleteSavedPlace({ placeId: place.id, userId: userInfo.id });
        setIsSaved(false);
      } else {
        await savePlace({ placeId: place.id, userId: userInfo.id, content: place });
        setIsSaved(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Star
      className={`w-6 h-6 mx-auto cursor-pointer ${
        isSaved ? "text-yellow-500 fill-yellow-500" : "text-neutral-900"
      }`}
      onClick={onClickSave}
    />
  );
}
