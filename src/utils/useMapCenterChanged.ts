import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/redux/store";

export function useMapCenterChanged(
	setShowReGps: React.Dispatch<React.SetStateAction<boolean>>,
) {
	const map = useSelector((state: RootState) => state.map.map);

	const handleCenterChanged = useCallback(() => {
		setShowReGps(true);
	}, [setShowReGps]);

	useEffect(() => {
		if (!map) return;
		map.addListener("center_changed", handleCenterChanged);
	}, [map, handleCenterChanged]);

	return { map };
}
