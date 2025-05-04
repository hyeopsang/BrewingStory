import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMap } from "../../app/redux/mapSlice";
import { RootState } from "../../app/redux/store";
import { useRestoreMarker } from "../utils/useRestoreMarker";

export default function MapComponent() {
  const dispatch = useDispatch();
  const map = useSelector((state: RootState) => state.map.map);

  const initializeMap = async () => {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    if (!navigator.geolocation) {
      console.error("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const map = new Map(document.getElementById("map") as HTMLElement, {
          zoom: 17,
          center: currentPos,
          mapId: "DEMO_MAP_ID",
          disableDefaultUI: true,
        });

        const userMarker = new AdvancedMarkerElement({
          map,
          position: currentPos,
          title: "현재 위치",
        });

        dispatch(setMap(map));

        userMarker.addListener("gmp-click", () => {
          map.setCenter(currentPos);
        });
      },
      (error) => {
        console.error("현재 위치를 가져오는 데 실패했습니다:", error);
      }
    );
  };
  useEffect(() => {
    

    initializeMap();
  }, [dispatch]);
  useRestoreMarker(map);

  return (
    <div id="map" style={{ width: "100%", height: "100vh" }} />
  );
}
