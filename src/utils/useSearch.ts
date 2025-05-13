import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPlaces } from "../app/redux/placesSlice";
import { setSelectedPlace } from "../app/redux/selectedPlaceSlice";
import type { RootState } from "../app/redux/store";
import { getDistanceFromLatLonInKm } from "./getDistanceFromLatLonInKm";
import { MarkerManager } from "./markerManager";
export function useSearch() {
	const dispatch = useDispatch();
	const [searchTxt, setSearchTxt] = useState(""); // 검색어 상태 추가
	const [loading, setLoading] = useState(false);
	const map = useSelector((state: RootState) => state.map.map);

	const performSearch = useCallback(
		async (searchTxt: string, currentLocation: google.maps.LatLng) => {
			// 지도에서 마커 제거 및 리스트 초기화

			if (!searchTxt || !currentLocation) {
				console.warn("검색어 또는 현재 위치가 없습니다.");
				return;
			}
			MarkerManager.clearMarkers();

			setLoading(true);
			try {
				// Google Maps 라이브러리 불러오기
				const placesLib = (await google.maps.importLibrary(
					"places",
				)) as google.maps.PlacesLibrary;
				const markerLib = (await google.maps.importLibrary(
					"marker",
				)) as google.maps.MarkerLibrary;
				const coreLib = (await google.maps.importLibrary(
					"core",
				)) as google.maps.CoreLibrary;

				if (!placesLib || !markerLib || !coreLib) {
					throw new Error("Google Maps 라이브러리 로드 실패");
				}

				const { Place } = placesLib;
				const { AdvancedMarkerElement } = markerLib;
				const { LatLngBounds } = coreLib;

				const request = {
					textQuery: searchTxt,
					fields: [
						"displayName",
						"location",
						"allowsDogs",
						"nationalPhoneNumber",
						"photos",
						"regularOpeningHours",
						"googleMapsURI",
						"formattedAddress",
					],
					includedType: "cafe",
					locationBias: currentLocation,
					isOpenNow: false,
					language: "ko",
					maxResultCount: 8,
					region: "kr",
				};

				const { places } = await Place.searchByText(request);
				if (places.length) {
					console.log(places);

					const bounds = new LatLngBounds();
					places.forEach((place, index) => {
						const markerImg = document.createElement("img");
						markerImg.src = "./images/marker.svg";
						markerImg.style.width = "25px";
						const markerView = new AdvancedMarkerElement({
							map,
							position: place.location,
							title: place.displayName,
							content: markerImg,
						});
						bounds.extend(place.location as google.maps.LatLng);
						MarkerManager.addMarker(place.id, markerView); // 마커 추가
						markerView.addListener("gmp-click", () => {
							dispatch(setSelectedPlace(place));
							map.panTo(place.location);
						});
					});
					const transformedPlaces = places.map((place) => {
						const photos = (place.photos || []) as { name?: string }[];

						const photoUrls = photos
							.map((photo) =>
								photo.name
									? `https://places.googleapis.com/v1/${photo.name}/media?key=AIzaSyCpx2XbyO4f5x9ObkxlkvspZaO4h_XN-r4&maxWidthPx=400`
									: null,
							)
							.filter((url): url is string => url !== null); // null 제거
						return {
							id: place.id,
							displayName: place.displayName,
							allowsDogs: place.allowsDogs,
							nationalPhoneNumber: place.nationalPhoneNumber,
							location: place.location,
							distance: getDistanceFromLatLonInKm(
								currentLocation.lat(),
								currentLocation.lng(),
								place.location.lat(),
								place.location.lng(),
							),
							photos: photoUrls,
							openingHours: place.regularOpeningHours,
							address: place.formattedAddress,
							url: place.googleMapsURI,
						};
					});
					dispatch(setPlaces(transformedPlaces));
					map.fitBounds(bounds);
				} else {
					console.log("검색 결과 없음");
				}
			} catch (error) {
				console.error("검색 오류:", error);
			} finally {
				setLoading(false);
			}
		},
		[map],
	);

	return { performSearch, searchTxt, setSearchTxt };
}
