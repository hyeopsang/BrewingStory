import { Button } from "../atoms/button";
import { useMoveToCurrentLocation } from "../utils/useMoveToLocation";
import { LocateFixed } from "lucide-react";
export default function LocationButton() {
  const moveToLocation = useMoveToCurrentLocation(); 

  return (
    <Button
      className="absolute right-[30px] bg-white rounded-full top-30 z-30 aspect-square shadow-md"
      id="centerOnMyLocation"
      onClick={moveToLocation}
    >
      <LocateFixed className="w-[40px] h-[40px] p-2" />
    </Button>
  );
}
