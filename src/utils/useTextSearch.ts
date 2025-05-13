import { useState } from "react";

export function useTextSearch() {
	const [searchTxt, setSearchTxt] = useState("");
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);

	const performSearch = async (txt: string, location: google.maps.LatLng) => {
		setLoading(true);
		try {
			const placesLib = (await google.maps.importLibrary(
				"places",
			)) as google.maps.PlacesLibrary;
			const { Place } = placesLib;
			const request = {
				textQuery: searchTxt,
				fields: ["displayName"],
				includedType: "cafe",
				isOpenNow: false,
				language: "ko",
				maxResultCount: 8,
				region: "kr",
			};
			const { places } = await Place.searchByText(request);

			setResults(places || []);
		} catch (e) {
			console.error("검색 오류:", e);
		} finally {
			setLoading(false);
		}
	};

	return { searchTxt, setSearchTxt, results, performSearch, loading };
}
