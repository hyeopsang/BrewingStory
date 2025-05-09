import { use, useEffect, useState } from "react";
import { useCurrentLocation } from "../utils/useCurrentLocation"
import { SearchBar } from "../organisms/search-bar";
import LocationButton from "../organisms/location-button";
import BoundSearch from "../organisms/bound-search";
import MapWrapper from "../organisms/map-wrapper";
import { SelectedPlace } from "../organisms/selected-place";
import { useBoundSearch } from "../utils/useBoundSearch";
import { useSelector } from "react-redux";
import { RootState } from "../app/redux/store";
import Modal from "../template/modal";
import BottomSheet from "../template/bottom-sheet";
let map: google.maps.Map | null = null; // 전역 변수로 선언
let center: google.maps.LatLng | null = null; // 전역 변수로 선언

export default function Main() {
  const [isOpen, setIsOpen] = useState(false);
  const [showReGps, setShowReGps] = useState(false);
  const currentLocation = useCurrentLocation();
    const selectedPlace = useSelector((state: RootState) => state.selectedPlace);

  return (
    <div className="relative h-svh mx-auto w-full overflow-hidden">
      <MapWrapper />
      <SearchBar
        currentLocation={currentLocation}
      />      
      <LocationButton />
      <BoundSearch setShowReGps={setShowReGps} showReGps={showReGps} />
      <BottomSheet 
        initialHeight={selectedPlace ? 280 : 200}
        snapPoints={[selectedPlace ? 280 : 200, 280, (500)]}
        onSnapChange={(index) => console.log(`현재 스냅 포인트: ${index}`)}
        borderRadius={12}
        maxHeight={500}
        className={""}
      >
        <SelectedPlace inBottomSheet={true}  />
      </BottomSheet>

    </div>
  );
}
