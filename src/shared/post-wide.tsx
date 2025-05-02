import Comment from "./comment";
import Like from "./like";
import Location from "./location";

export default function PostWide(){
    return (
        <div className="w-full h-full relative bg-neutral-200 text-white">
            <div className="absolute bottom-3 w-full px-3 h-fit flex text-xs">
                <div className="w-[calc(100%-48px)] h-35 mt-auto px-4 flex flex-col gap-4">
                    <div className=" flex items-center justify-left gap-3">
                        <div className="w-7 aspect-square bg-white rounded-full"></div>
                        <p className="text-sm font-semibold">dbtkdguq3</p>
                        <button className="px-2 py-0.5 border border-white rounded-full">팔로잉</button>
                    </div>
                    <p>감성이 넘치는 카페에요</p>
                </div>
                <div>
                    <ul className="w-fit flex flex-col gap-6">
                        <li className="text-center">
                            <Like />
                            <p className="pt-1 text-xs">0</p>
                        </li>
                        <li className="text-center">
                            <Comment />
                            <p className="pt-1 text-xs">0</p>
                        </li>
                        <li>
                            <Location />
                        </li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}