import { Button } from "../atoms/Button";
import { CafeIcon } from "../atoms/cafe-icon";
import { RightIcon } from "../atoms/right-icon";
import { Text } from "../atoms/Text";
import { textSizeResponsive } from "../utils/responsive";
interface CafeAddProps {
    onOpen: () => void;
}

export function CafeAdd({ onOpen } : CafeAddProps) {
    return (
        <Button size="full" onClick={onOpen} className="justify-between py-4 sm:text-base md:text-lg lg:text-xl text-[#232323] bg-white focus:bg-gradient-to-r hover:bg-gradient-to-r from-white via-neutral-100 via-50% to-white">
            <div className="flex gap-6 items-center">
                <CafeIcon className={"text-responsive"} />
                <Text size="responsive">카페 추가</Text>
            </div>
            <RightIcon className={"text-responsive"}/>
        </Button>
    )
}
