import { useMoveToCurrentLocation } from "../utils/useMoveToLocation";
import { LocateFixed } from "lucide-react";
export default function LocationButton() {
  const moveToLocation = useMoveToCurrentLocation(); // 커스텀 훅 사용

  return (
    <div
      className="absolute right-[30px] bg-white rounded-full top-30 z-30 aspect-square shadow-md"
      id="centerOnMyLocation"
      onClick={moveToLocation} // 이벤트 핸들러에 함수 전달
    >
      <LocateFixed className="w-[40px] h-[40px] p-2" />
    </div>
  );
}
