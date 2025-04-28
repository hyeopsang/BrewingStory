import { getDistanceFromLatLonInKm } from "../../utils/getDistanceFromLatLonInKm";
import { useDispatch, useSelector } from "react-redux";
import { setPlaces } from "../../app/redux/placesSlice";
import { RootState } from "../../app/redux/store";
import { useCallback, useEffect, useRef } from "react";
import { MarkerManager } from "./markerManager";
import { useRefContext } from "../../app/context/RefContext";
import { useCurrentLocation } from "./useCurrentLocation";
import { setId } from "../../app/redux/idSlice";
export function useBoundSearch(
  setShowReGps: React.Dispatch<React.SetStateAction<boolean>>
) {
    const currentLocation = useCurrentLocation();
  const dispatch = useDispatch();
  const map = useSelector((state: RootState) => state.map.map);
  const { swiperRef } = useRefContext();
  const placeId = [];
  useEffect(() => {
    if (!map) return; // 🛡️ map이 null이면 실행하지 않음
  
    console.log("🗺️ 지도 이동 감지 시작!");
    const listener = map.addListener("dragend", () => {
      setShowReGps(true);
    });
  
    // ✅ 클린업: 컴포넌트 언마운트 시 리스너 제거
    return () => {
      google.maps.event.removeListener(listener);
      console.log("🧹 지도 이동 감지 해제!");
    };
  }, [map]); // map이 변경될 때마다 재실행
  

  const searchCafesInBounds = useCallback(async () => {
    setShowReGps(false);
    // 지도에서 마커 제거 및 리스트 초기화


    if (!map) return;
      MarkerManager.clearMarkers();
    

    const center = map.getCenter();
    const { Place, SearchNearbyRankPreference, Photo, OpeningHoursPeriod } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    const request = {
      fields: ["displayName", "location", "allowsDogs", "nationalPhoneNumber", "photos", "regularOpeningHours", "googleMapsURI", "formattedAddress"],
      locationRestriction: {
        center: center,
        radius: 500,
      },
      includedPrimaryTypes: ["cafe"],
      maxResultCount: 5,
      rankPreference: SearchNearbyRankPreference.DISTANCE,
      language: "ko",
      region: "kr",
    };
  
    const { places } = await google.maps.places.Place.searchNearby(request);
    if (places.length) {
      const { PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      const { LatLngBounds } = await google.maps.importLibrary("core") as google.maps.CoreLibrary;
      
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
        MarkerManager.addMarker(markerView, () => {swiperRef.current?.slideTo(index);});
        placeId.push(place.id);

        console.log(place);
        
    });
    dispatch(setId(placeId));

      console.log(places);
      // places 데이터를 리덕스에 저장하기 전 구조를 평탄화
      const transformedPlaces = places.map((place) => {
        const photos = (place.photos || []) as { name?: string }[];
        
        const photoUrls = photos.map((photo) => 
          photo.name 
            ? `https://places.googleapis.com/v1/${photo.name}/media?key=AIzaSyCpx2XbyO4f5x9ObkxlkvspZaO4h_XN-r4&maxWidthPx=400`
            : null
        ).filter((url): url is string => url !== null); // null 제거
      
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
            place.location.lng()
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
      console.log("No results");
    }
  }, [map, dispatch, setShowReGps]); 

  return { searchCafesInBounds };
}
