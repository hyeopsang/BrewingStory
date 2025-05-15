import { UserInfo } from '@api/user';
import { Button } from '@atoms/elements/button';
import { BookMarkIcon } from '@atoms/icons/book-mark-icon';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { Place } from 'src/types/map';

import { deleteSavedPlace, getSavedPlaces, savePlace } from '../../../api';

interface PlaceInfoProps {
  place: Place;
}

interface StateType {
  isAuthenticated: boolean;
  user: UserInfo | null;
  auth: {
    user: UserInfo | null;
  };
}

interface AuthState {
  user: UserInfo | null;
}

export function PlaceSave({ place }: PlaceInfoProps) {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // 중복 클릭 방지

  const auth: AuthState = useSelector((state: StateType) => state.auth);
  const userInfo = auth.user;

  useEffect(() => {
    const fetchSavedStatus = async () => {
      if (!userInfo) return;

      try {
        const savedPlaces = await getSavedPlaces(userInfo.userId);
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
        await deleteSavedPlace({ placeId: place.id, userId: userInfo.userId });
        setIsSaved(false);
      } else {
        await savePlace({
          placeId: place.id,
          userId: userInfo.userId,
          content: place,
        });
        setIsSaved(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className={`mx-auto h-6 w-6 cursor-pointer ${
        isSaved ? 'fill-yellow-500 text-yellow-500' : 'text-neutral-900'
      }`}
      onClick={onClickSave}
    >
      <BookMarkIcon />
    </Button>
  );
}
