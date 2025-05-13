export const getCurrentLocation = async (): Promise<google.maps.LatLng> => {
	return new Promise(async (resolve, reject) => {
		try {
			const { LatLng } = (await google.maps.importLibrary(
				"core",
			)) as google.maps.CoreLibrary;

			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const lat = position.coords.latitude;
						const lng = position.coords.longitude;

						const center = new LatLng(lat, lng);
						resolve(center);
					},
					(error) => {
						console.error("Geolocation error:", error);
						reject(error);
					},
				);
			} else {
				reject(new Error("Geolocation is not supported"));
			}
		} catch (error) {
			console.error("Error loading Google Maps library:", error);
			reject(error);
		}
	});
};
