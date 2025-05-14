import { useEffect, useState } from 'react';

import { getCurrentLocation } from './getCurrentLocation';

export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLng | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const location = await getCurrentLocation();
      setCurrentLocation(location as google.maps.LatLng);
    };

    fetchLocation();
  }, []);

  return currentLocation;
};
