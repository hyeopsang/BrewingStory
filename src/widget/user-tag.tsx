import { RightIcon } from "./right-icon";
import { UserTagIcon } from "./user-tag-icon";

export function UserTag(){
    return (
        <button className="w-full flex justify-between items-center px-6 py-3 text-[#232323] bg-white">
            <UserTagIcon />
            <p>사람 태그</p>
            <RightIcon />
        </button>
    )
} 