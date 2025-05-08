import { Button } from "../atoms/Button";
import { Text } from "../atoms/Text";
import CommentIcon from "../atoms/comment-icon";
import LikeIcon from "../atoms/like-icon";
import { LocationIcon } from "../atoms/location-icon";

export default function PostWide(){
    return (
        <div className="w-full h-full relative bg-neutral-200 text-white">
            <div className="absolute bottom-3 w-full px-3 h-fit flex text-xs">
                <div className="w-[calc(100%-48px)] h-35 mt-auto px-4 flex flex-col gap-4">
                    <div className=" flex items-center justify-left gap-3">
                        <div className="w-7 aspect-square bg-white rounded-full"></div>
                        <Text weight={"semibold"}>dbtkdguq3</Text>
                        <Button className="px-2 py-0.5 border border-white rounded-full">팔로잉</Button>
                    </div>
                    <p>감성이 넘치는 카페에요</p>
                </div>
                <div>
                    <ul className="w-fit flex flex-col gap-6">
                        <li className="text-center">
                            <LikeIcon />
                            <p className="pt-1 text-xs">0</p>
                        </li>
                        <li className="text-center">
                            <CommentIcon />
                            <p className="pt-1 text-xs">0</p>
                        </li>
                        <li>
                            <LocationIcon />
                        </li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}