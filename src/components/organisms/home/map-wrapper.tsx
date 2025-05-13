import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { initializeMap } from "../utils/initializeMap";

const MapWrapper = () => {
	const mapRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (mapRef.current) {
			initializeMap({ container: mapRef.current, dispatch });
		}
	}, [dispatch, mapRef.current]); // mapRef.current 추가

	return <div ref={mapRef} className="h-full w-full" />;
};

export default MapWrapper;
