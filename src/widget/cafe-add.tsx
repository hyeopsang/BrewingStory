import { CafeIcon } from "./cafe-icon";
import { RightIcon } from "./right-icon";

interface CafeAddProps {
    onOpen: () => void;
}

export function CafeAdd({ onOpen } : CafeAddProps) {
    return (
        <button onClick={onOpen} className="w-full cursor-pointer flex justify-between items-center px-6 py-3 text-xl text-[#232323] bg-white">
            <div className="flex gap-6 items-center">
                <CafeIcon />
                <p>카페 추가</p>
            </div>
            <RightIcon />
        </button>
    )
}
