import { RightIcon } from "./right-icon";
import { UserTagIcon } from "./user-tag-icon";

interface UserTagProps {
    onOpen: () => void;
}

export function UserTag({ onOpen }: UserTagProps) {
    return (
        <button onClick={onOpen} className="w-full flex justify-between items-center px-6 py-3 text-xl cursor-pointer text-[#232323] bg-white">
            <div className="flex gap-6 items-center">
                <UserTagIcon />
                <p>사람 태그</p>
            </div>
            <RightIcon />
        </button>
    )
} 
