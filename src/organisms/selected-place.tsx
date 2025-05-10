import { useSelector } from "react-redux";
import { RootState } from "../app/redux/store";
import { getOpenStatusFromDescriptions } from "../utils/openingHours";
import { BookMarkIcon } from "../atoms/book-mark-icon";
import { useEffect } from "react";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/button";

export function SelectedPlace({ inBottomSheet = false }) {
  const selectedPlace = useSelector((state: RootState) => state.selectedPlace);
  const weekdayDescriptions = selectedPlace?.regularOpeningHours?.weekdayDescriptions;
  const status = Array.isArray(weekdayDescriptions)
    ? getOpenStatusFromDescriptions(weekdayDescriptions)
    : null;


  return (
    <div className="lg:px-8 md:px-6 sm:px-6">
      {!inBottomSheet && <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4" />}
      {selectedPlace ? (
  <div className="flex flex-col gap-1 text-sm">
    <div className="w-full flex items-center justify-between">
      <Text as={"h2"} weight="semibold" className="text-responsive-sm">{selectedPlace.displayName}</Text>
      <Button size="fit" outline className="mt-2 rounded-full transition duration-200 group hover:border-blue-500">
        <BookMarkIcon className="text-neutral-400 group-hover:text-blue-500"/>
        <Text color="gray" className="group-hover:text-blue-500">저장</Text>
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

