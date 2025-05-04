import { use, useEffect, useState } from "react";
import { useCurrentLocation } from "./utils/useCurrentLocation"
import SearchBar from "./ui/search-bar";
import LocationButton from "./ui/location-button";
import BoundSearch from "./ui/bound-search";
import Map from "./ui/map";
import NavBar from "../widget/nav-bar";
import { SelectedPlace } from "./ui/selected-place";
import { useBoundSearch } from "./utils/useBoundSearch";
import Modal from "../widget/modal";
import BottomSheet from "../widget/bottom-sheet";
let map: google.maps.Map | null = null; // 전역 변수로 선언
let center: google.maps.LatLng | null = null; // 전역 변수로 선언

function KakaoMap() {
  const [isOpen, setIsOpen] = useState(false);
  const [showReGps, setShowReGps] = useState(false);
  const currentLocation = useCurrentLocation();
  const [isData, setIsData] = useState(false);
  return (
    <div className="relative h-svh mx-auto w-full overflow-hidden">
      <Map />
      <SearchBar
        currentLocation={currentLocation}
      />      
      <LocationButton />
      <BoundSearch setShowReGps={setShowReGps} showReGps={showReGps} />
      <NavBar/>
      <BottomSheet 
        initialHeight={isData ? 280 : 200}
        snapPoints={[(isData ? 280 : 200), 400, 500]}
        onSnapChange={(index) => console.log(`현재 스냅 포인트: ${index}`)}
      >
        <SelectedPlace inBottomSheet={true} availability={setIsData} />
      </BottomSheet>

    </div>
  );
}

export default KakaoMap;
