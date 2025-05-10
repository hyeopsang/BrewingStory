import { Link } from "react-router";
import { ImageIcon } from "../atoms/image-icon";
import { MediaIcon } from "../atoms/media-icon";
import { Text } from "../atoms/Text";

export function SelectTemplate() {
    return (
        <div className="w-full py-6 h-fit flex flex-col lg:gap-4 md:gap-3 sm:gap-2 items-center text-[#232323] text-sm font-bold">
            <Text as={"h2"} size="responsive-xs" weight="semibold" className="text-center">Upload</Text>
            <div className="flex flex-col items-start w-full bg-white text-[#232323] text-sm font-bold">
                <Link to={"/edit/photo"} className="flex items-center gap-4 w-full lg:px-8 md:px-6 sm:px-6 lg:py-3 md:py-3 sm:py-2 rounded cursor-pointer transition-colors duration-300 active:bg-gray-200 hover:bg-gradient-to-r from-neutral-100 via-neutral-50 via-50% to-neutral-100">
                    <ImageIcon />               
                    <Text size="responsive-xs">사진 올리기</Text>
                </Link>
                <Link to={"/edit/video"} className="flex items-center gap-4 w-full lg:px-8 md:px-6 sm:px-6 lg:py-3 md:py-3 sm:py-2 rounded cursor-pointer transition-colors duration-300 active:bg-gray-200 hover:bg-gradient-to-r from-neutral-100 via-neutral-50 via-50% to-neutral-100">
                    <MediaIcon />
                    <Text size="responsive-xs">동영상 올리기</Text>
                </Link>
            </div>
        </div>
    )
}
