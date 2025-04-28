import { Link } from "react-router"
import { Place } from "../../map/types";
import MyReview from "./my-review"
import OtherReview from "./other-review"

import { Star, Phone, SquareArrowOutUpLeft } from "lucide-react"
import PlaceSave from "./place-save"
interface ReviewColor {
    taste: string;
    mood: string;
    kind: string;
    comfort: string;
    wifi: string;
    parking: string;
}

interface PlaceInfoProps {
    place: Place;
}

export default function PlaceInfo({ place } : PlaceInfoProps) {
    
    return (
        <>
        <h1 className="text-center text-lg text-neutral-900 font-bold">{place.displayName}</h1>
        <p className="text-center text-neutral-900 font-medium p-2">{place.address}</p>
        <div className="mx-auto flex w-fit gap-6">
            <a href={place.url} target="_blank" rel="noopener noreferrer">
                <SquareArrowOutUpLeft className="w-6 h-6 text-neutral-900" />
            </a>
        {place.phone ? null : (
            <a href={`tel:${place.phone}`}>
                <Phone className="w-6 h-6 text-neutral-900" />
            </a>

        )}
        <PlaceSave place={place}/>
        </div>
        </>
    )
} 
