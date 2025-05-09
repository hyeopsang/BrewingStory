import { useSelector } from "react-redux";
import { RootState } from "../app/redux/store";
import { getOpenStatusFromDescriptions } from "../utils/openingHours";
import { BookMarkIcon } from "../atoms/book-mark-icon";
import { useEffect } from "react";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";

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
      <Text as={"h2"} weight="semibold" className="text-responsive-sm">{selectedPlace.displayName}</Text>
      <Button size="fit" outline className="mt-2 transition duration-200">
        <BookMarkIcon/>
        <Text>저장</Text>
      </Button>
    </div>
    <Text>{selectedPlace.address}</Text>
    <Text color={"gray"}>{selectedPlace.nationalPhoneNumber}</Text>
    {weekdayDescriptions && weekdayDescriptions.length > 0 ? (
      <>
        {status?.isOpen ? (
          <div className="flex gap-2">
            <Text className="text-responsive-xs" color={"blue"}>영업 중</Text>
            <Text className="text-responsive-xs" color={"black"}>{status?.message}</Text>
          </div>
        ) : (
          <div className="flex gap-2">
            <Text className="text-responsive-xs" color={"red"}>영업 종료</Text>
            <Text className="text-responsive-xs" color={"black"}>{status?.message}</Text>
          </div>
        )}
      </>
    ) : (
      <Text className="text-responsive-xs" color={"red"}>영업 정보 없음</Text>
    )}
  </div>
) : null}
    </div>
  );
}

