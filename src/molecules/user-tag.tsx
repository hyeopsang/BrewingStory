import { Button } from "../atoms/button";
import { Text } from "../atoms/Text";
import { RightIcon } from "../atoms/right-icon";
import { UserTagIcon } from "../atoms/user-tag-icon";

interface UserTagProps {
    onOpen: () => void;
}

export function UserTag({ onOpen }: UserTagProps) {
    return (
        <Button onClick={onOpen} className="w-full justify-between py-4 sm:py-3 text-[#232323] bg-white border-none focus:bg-gradient-to-r hover:bg-gradient-to-r from-white via-neutral-100 via-50% to-white">
            <div className="flex gap-6 items-center">
                <UserTagIcon className="text-responsive-sm" />
                <Text className="text-responsive-sm">사람 태그</Text>
            </div>
            <RightIcon className="text-responsive-sm" />
        </Button>
    )
}
