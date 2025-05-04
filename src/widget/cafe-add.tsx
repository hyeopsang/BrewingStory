import { CafeIcon } from "./cafe-icon";
import { RightIcon } from "./right-icon";

export function CafeAdd(){
    return (
        <button className="w-full flex justify-between items-center px-6 py-3 text-[#232323] bg-white">
            <CafeIcon />
            <p>카페 추가</p>
            <RightIcon />
        </button>
    )
}