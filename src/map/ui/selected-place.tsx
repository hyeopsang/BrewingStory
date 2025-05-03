import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import { getOpenStatusFromDescriptions } from "./opening-hours";

export function SelectedPlace() {
  const selectedPlace = useSelector((state: RootState) => state.selectedPlace);
  const weekdayDescriptions = selectedPlace?.regularOpeningHours?.weekdayDescriptions;

  // 영업 상태 확인
  const status = Array.isArray(weekdayDescriptions)
    ? getOpenStatusFromDescriptions(weekdayDescriptions)
    : null;

  return (
    <div className="bg-white max-w-mobile w-full h-fit rounded-t-2xl px-6 pb-6 pt-4 fixed bottom-12 z-40">
      <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
      {selectedPlace ? (
        <div className="flex flex-col gap-1 text-xs">
          <h2 className="text-base font-semibold">{selectedPlace.displayName}</h2>
          <p>{selectedPlace.address}</p>
          <p>Tel. {selectedPlace.nationalPhoneNumber}</p>
          {weekdayDescriptions && weekdayDescriptions.length > 0 ? (
            <>
              {/* 영업 중 상태일 때 */}
              {status?.isOpen ? (
                <div className="flex gap-2">
                  <p className="text-blue-500">영업 중</p>
                  <p>{status?.message}</p> {/* 오늘 마감 시간 표시 */}
                </div>
              ) : (
                // 영업 종료 상태일 때
                <div className="flex gap-2">
                  <p className="text-red-600">영업 종료</p>
                  <p>{status?.message}</p> {/* 내일 오픈 시간 또는 휴무 정보 */}
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
