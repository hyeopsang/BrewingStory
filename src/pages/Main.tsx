import { use, useEffect, useState } from "react";
import { useCurrentLocation } from "../utils/useCurrentLocation"
import { SearchBar } from "../organisms/search-bar";
import LocationButton from "../organisms/location-button";
import BoundSearch from "../organisms/bound-search";
import MapWrapper from "../organisms/map-wrapper";
import { SelectedPlace } from "../organisms/selected-place";
import { useBoundSearch } from "../utils/useBoundSearch";
import Modal from "../template/modal";
import BottomSheet from "../template/bottom-sheet";
let map: google.maps.Map | null = null; // 전역 변수로 선언
let center: google.maps.LatLng | null = null; // 전역 변수로 선언

export default function Main() {
  const [isOpen, setIsOpen] = useState(false);
  const [showReGps, setShowReGps] = useState(false);
  const currentLocation = useCurrentLocation();
  const [isData, setIsData] = useState(false);
  return (
    <div className="relative h-svh mx-auto w-full overflow-hidden">
      <MapWrapper />
      <SearchBar
        currentLocation={currentLocation}
      />      
      <LocationButton />
      <BoundSearch setShowReGps={setShowReGps} showReGps={showReGps} />
      <BottomSheet 
        maxHeight={900}
        initialHeight={350}
        snapPoints={[350,500,900]}
        onSnapChange={(index) => console.log(`현재 스냅 포인트: ${index}`)}
        borderRadius={20}
        className={""}
      >
        <SelectedPlace inBottomSheet={true} availability={setIsData} />
      </BottomSheet>

    </div>
  );
}
