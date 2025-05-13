import { Loader } from "@googlemaps/js-api-loader";
import type { Dispatch } from "redux";
import { setMap } from "../app/redux/mapSlice";

interface InitMapOptions {
	container: HTMLDivElement;
	dispatch: Dispatch;
}

export const initializeMap = ({ container, dispatch }: InitMapOptions) => {
	const loader = new Loader({
		apiKey: import.meta.env.VITE_GOOGLE_API_KEY, // 환경변수에서 API 키 가져오기
		version: "weekly",
	});

	loader.load().then(async () => {
		// Google Maps API 로드 후 실행
		const { Map } = (await google.maps.importLibrary(
			"maps",
		)) as google.maps.MapsLibrary;
		const { AdvancedMarkerElement } = (await google.maps.importLibrary(
			"marker",
		)) as google.maps.MarkerLibrary;

		// 기본 위치 설정 (일단 서울)
		const defaultCenter = { lat: 37.5665, lng: 126.978 };

		// 위치를 먼저 가져오기
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const currentPos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};

					// 현재 위치로 지도 중심 이동
					const map = new Map(container, {
						zoom: 17,
						center: currentPos,
						mapId: "DEMO_MAP_ID", // 지도 ID (필요에 따라 변경)
						disableDefaultUI: true,
					});

					dispatch(setMap(map)); // Redux에 맵 저장

					const userMarker = new AdvancedMarkerElement({
						map,
						position: currentPos,
						title: "현재 위치",
					});

					userMarker.addListener("gmp-click", () => {
						map.setCenter(currentPos); // 마커 클릭 시 지도 다시 중앙으로
					});
				},
				(error) => {
					console.error("현재 위치를 가져오는 데 실패했습니다:", error);
					// 위치를 가져오지 못한 경우, 기본 위치로 설정
					const map = new Map(container, {
						zoom: 17,
						center: defaultCenter,
						mapId: "DEMO_MAP_ID", // 지도 ID (필요에 따라 변경)
						disableDefaultUI: true,
					});

					dispatch(setMap(map)); // Redux에 맵 저장
				},
			);
		} else {
			// Geolocation API가 지원되지 않는 경우, 기본 위치로 설정
			const map = new Map(container, {
				zoom: 17,
				center: defaultCenter,
				mapId: "DEMO_MAP_ID", // 지도 ID (필요에 따라 변경)
				disableDefaultUI: true,
			});

			dispatch(setMap(map)); // Redux에 맵 저장
		}
	});

	return null;
};
