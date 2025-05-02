import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/redux/store";
import { Place } from "./types/index";
import { useCurrentLocation } from "./utils/useCurrentLocation"
import SearchBar from "./ui/search-bar";
import LocationButton from "./ui/location-button";
import BoundSearch from "./ui/bound-search";
import Map from "./ui/map";
import NavBar from "../widget/nav-bar";

let map: google.maps.Map | null = null; // 전역 변수로 선언
let center: google.maps.LatLng | null = null; // 전역 변수로 선언

function KakaoMap() {
  const [isOpen, setIsOpen] = useState(false);
  const [showReGps, setShowReGps] = useState(false);
  const currentLocation = useCurrentLocation();
  return (
    <div className="relative h-svh mx-auto min-w-[375px] max-w-[428px] overflow-hidden">
      <Map />
      <SearchBar
        setIsOpen={setIsOpen}
        currentLocation={currentLocation}
      />      
      <LocationButton />
      <BoundSearch setShowReGps={setShowReGps} showReGps={showReGps} />
      <NavBar/>
    </div>
  );
}

export default KakaoMap;
