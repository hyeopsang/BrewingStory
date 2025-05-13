import { LocateFixed } from "lucide-react";
import { Button } from "../atoms/button";
import { useMoveToCurrentLocation } from "../utils/useMoveToLocation";
export default function LocationButton() {
	const moveToLocation = useMoveToCurrentLocation();

	return (
		<Button
			className="absolute top-30 right-[30px] z-30 aspect-square rounded-full bg-white shadow-md"
			id="centerOnMyLocation"
			onClick={moveToLocation}
		>
			<LocateFixed className="h-[40px] w-[40px] p-2" />
		</Button>
	);
}
