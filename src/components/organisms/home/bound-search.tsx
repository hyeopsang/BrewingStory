import { useEffect } from "react";
import { useBoundSearch } from "../utils/useBoundSearch";

interface BoundSearchProps {
	setShowReGps: React.Dispatch<React.SetStateAction<boolean>>;
	showReGps: boolean;
}

export default function BoundSearch({
	setShowReGps,
	showReGps,
}: BoundSearchProps) {
	const { searchCafesInBounds } = useBoundSearch(setShowReGps);
	console.log("BoundSearch 렌더링됨, showReGps:", showReGps);

	useEffect(() => {
		searchCafesInBounds();
	}, [searchCafesInBounds]);

	return (
		<div
			className="absolute top-30 right-0 left-0 z-30 m-auto flex h-fit w-fit cursor-pointer items-center justify-center rounded-full bg-white px-5 py-2 shadow-md"
			onClick={searchCafesInBounds}
			style={{
				opacity: showReGps ? 1 : 0,
				transition: "opacity 0.3s ease-in-out",
			}}
		>
			<p className="text-xs">현재 위치에서 검색</p>
		</div>
	);
}
