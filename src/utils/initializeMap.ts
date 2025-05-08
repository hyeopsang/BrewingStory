import { setMap } from "../app/redux/mapSlice";
import { Dispatch } from "redux";

interface InitMapOptions {
  container: HTMLDivElement;
  dispatch: Dispatch;
}

export const initializeMap = async ({ container, dispatch }: InitMapOptions) => {
  const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

  const defaultCenter = { lat: 37.5665, lng: 126.978 };

  const map = new Map(container, {
    zoom: 17,
    center: defaultCenter,
    mapId: "DEMO_MAP_ID",
    disableDefaultUI: true,
  });

  dispatch(setMap(map));

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        map.setCenter(currentPos);

        const userMarker = new AdvancedMarkerElement({
          map,
          position: currentPos,
          title: "현재 위치",
        });

        userMarker.addListener("gmp-click", () => {
          map.setCenter(currentPos);
        });
      },
      (error) => {
        console.error("현재 위치를 가져오는 데 실패했습니다:", error);
      }
    );
  }

  return map;
};
