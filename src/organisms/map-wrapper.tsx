import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeMap } from "../utils/initializeMap";

const MapWrapper = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mapRef.current) {
      initializeMap({ container: mapRef.current, dispatch });
    }
  }, [dispatch]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default MapWrapper;
