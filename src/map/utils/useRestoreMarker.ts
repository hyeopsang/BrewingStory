import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";

export function useRestoreMarker(map: google.maps.Map | null) {
  const savedIds = useSelector((state: RootState) => state.id);

  useEffect(() => {
    if (!map || !savedIds.length) return;

    async function getPlaceDetails() {
      const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

      for (const id of savedIds) {
        const place = new Place({
          id,
          requestedLanguage: 'ko',
        });

        await place.fetchFields({
          fields: ['displayName', 'formattedAddress', 'location'],
        });

        console.log("📍복원된 장소:", place.displayName);

        new AdvancedMarkerElement({
          map,
          position: place.location,
          title: place.displayName,
        });
        
      }
    }

    getPlaceDetails();
  }, [map, savedIds.join(",")]); 
}
