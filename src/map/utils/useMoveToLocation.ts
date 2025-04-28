import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
export const useMoveToCurrentLocation = () => {
  const map = useSelector((state: RootState) => state.map.map);

  // 현재 위치로 이동하는 함수 정의
  const moveToLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const currentPos = new google.maps.LatLng(lat, lng); // 현재 위치 좌표 생성
          map.panTo(currentPos); // 지도 이동
        },
        () => {
          console.error("현재 위치를 가져오는 데 실패했습니다.");
        }
      );
    } else {
      console.error("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
    }
  };

  return moveToLocation; // 함수 반환
};
