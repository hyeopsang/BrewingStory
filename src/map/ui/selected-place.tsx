import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import { getOpenStatusFromDescriptions } from "./opening-hours";
import BookMarkIcon from "../../profile/book-mark-icon";
import { useEffect } from "react";
export function SelectedPlace({ inBottomSheet = false, availability }) {
  const selectedPlace = useSelector((state: RootState) => state.selectedPlace);
  const weekdayDescriptions = selectedPlace?.regularOpeningHours?.weekdayDescriptions;
  const status = Array.isArray(weekdayDescriptions)
    ? getOpenStatusFromDescriptions(weekdayDescriptions)
    : null;
    useEffect(() => {
      if (typeof availability === 'function') {
        availability(!!selectedPlace);
      }
    }, [selectedPlace, availability]);
  // Bottom Sheet 내부에서 사용될 때는 fixed 포지션 제거
  const containerClass = inBottomSheet 
    ? "bg-white w-full h-fit px-6 pb-6 pt-4" 
    : "bg-white max-w-mobile w-full h-fit rounded-t-2xl px-6 pb-6 pt-4 fixed bottom-12 z-60";

  return (
    <div className={containerClass}>
      {!inBottomSheet && <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4" />}
      {selectedPlace ? (
  <div className="flex flex-col gap-1 text-sm">
    <div className="w-full flex items-center justify-between">
      <h2 className="text-lg font-semibold">{selectedPlace.displayName}</h2>
      <button className="py-2 px-3 rounded-full flex items-center gap-2 mt-2 text-gray-500 hover:text-blue-500 hover:border-blue-500 transition duration-200 border">
        <BookMarkIcon/>
        <p>저장</p>
      </button>
    </div>
    <p>{selectedPlace.address}</p>
    <p className="text-gray-500">{selectedPlace.nationalPhoneNumber}</p>
    {weekdayDescriptions && weekdayDescriptions.length > 0 ? (
      <>
        {status?.isOpen ? (
          <div className="flex gap-2">
            <p className="text-blue-500">영업 중</p>
            <p>{status?.message}</p>
          </div>
        ) : (
          <div className="flex gap-2">
            <p className="text-red-600">영업 종료</p>
            <p>{status?.message}</p>
          </div>
        )}
      </>
    ) : (
      <p className="text-red-600">영업 정보 없음</p>
    )}
  </div>
) : null}
    </div>
  );
}

