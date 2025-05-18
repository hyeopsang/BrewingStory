/*  
  그냥 if 조건문으로 했을 때는 원하는 대로 작동하지 않음.  
  window.addEventListener("resize", handleResize);
  윈도우 이벤트 리스너를 이용하여 실행 
  return () => window.removeEventListener("resize", handleResize);
  불필요하게 리렌더링되는 상황을 방지
*/
import { BoundSearch } from '@molecules/map/bound-search';
import { LocationButton } from '@molecules/map/location-button';
import { MapWrapper } from '@molecules/map/map-wrapper';
import { SelectedPlace } from '@molecules/map/place-modal/selected-place';
import { SearchBar } from '@molecules/map/search-bar';
import { useCurrentLocation } from '@utils/useCurrentLocation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BottomSheet } from 'src/template/bottom-sheet';

import type { RootState } from '../../app/redux/store';

export function Main() {
  const [snap1, setSnap1] = useState(190);
  const [snap2, setSnap2] = useState(263);
  const [snap3, setSnap3] = useState(500);

  const [showReGps, setShowReGps] = useState(false);
  const currentLocation = useCurrentLocation();
  const selectedPlace = useSelector((state: RootState) => state.selectedPlace);

  // 스냅포인트 계산 함수
  const calculateSnapPoints = () => {
    const width = window.innerWidth;
    if (width >= 521) {
      setSnap1(selectedPlace ? 275 : 190);
      setSnap2(275);
      setSnap3(500);
    } else if (width >= 376) {
      setSnap1(selectedPlace ? 265 : 188);
      setSnap2(265);
      setSnap3(500);
    } else if (width >= 321) {
      setSnap1(selectedPlace ? 255 : 188);
      setSnap2(255);
      setSnap3(500);
    }
  };

  useEffect(() => {
    calculateSnapPoints();

    const handleResize = () => {
      calculateSnapPoints();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedPlace]);

  return (
    <div className="relative mx-auto h-svh w-full overflow-hidden">
      <MapWrapper />
      <SearchBar currentLocation={currentLocation} />
      <LocationButton />
      <BoundSearch setShowReGps={setShowReGps} showReGps={showReGps} />
      <BottomSheet
        initialHeight={snap1}
        snapPoints={[snap1, snap2, snap3]}
        onSnapChange={(index) => console.log(`현재 스냅 포인트: ${index}`)}
        borderRadius={12}
        maxHeight={snap3}
        className="-bottom-[200px]"
      >
        <SelectedPlace inBottomSheet={true} />
      </BottomSheet>
    </div>
  );
}
