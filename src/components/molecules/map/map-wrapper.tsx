import { initializeMap } from '@utils/initializeMap';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

export const MapWrapper = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mapRef.current) {
      initializeMap({ container: mapRef.current, dispatch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, mapRef.current]); // mapRef.current 추가

  return <div ref={mapRef} className="h-full w-full" />;
};
