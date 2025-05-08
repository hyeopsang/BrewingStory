import { useEffect } from "react";
import { useBoundSearch } from "../utils/useBoundSearch";
import { Text } from "../atoms/Text";

interface BoundSearchProps {
  setShowReGps: React.Dispatch<React.SetStateAction<boolean>>;
  showReGps: boolean;
}

export default function BoundSearch({ setShowReGps, showReGps }: BoundSearchProps) {
  const { searchCafesInBounds } = useBoundSearch(setShowReGps);
  console.log("BoundSearch 렌더링됨, showReGps:", showReGps);

  useEffect(() => {
    searchCafesInBounds();
  }, [searchCafesInBounds]); 

  return (
    <div
      className="absolute left-0 right-0 m-auto top-30 z-30 w-fit h-fit px-5 py-2 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer"
      onClick={searchCafesInBounds}
      style={{ opacity: showReGps ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}
    >
      <Text size="xs" weight={"normal"}>현재 위치에서 검색</Text>
    </div>
  );
}
