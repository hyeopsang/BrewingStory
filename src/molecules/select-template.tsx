import { Link } from "react-router";
import { ImageIcon } from "../atoms/image-icon";
import { MediaIcon } from "../atoms/media-icon";
import { Text } from "../atoms/Text";

export function SelectTemplate() {
    return (
        <div className="w-full py-6 h-fit flex flex-col gap-6 items-center text-[#232323] text-sm font-bold">
            <Text as={"h2"} className="text-center">Upload</Text>
            <div className="flex flex-col items-start w-full bg-white text-[#232323] text-sm font-bold">
                <Link to={"/edit/photo"} className="flex items-center gap-2 w-full px-6 py-3 rounded cursor-pointer transition-colors duration-300 active:bg-gray-200">
                    <ImageIcon />               
                    <Text>사진 올리기</Text>
                </Link>
                <Link to={"/edit/video"} className="flex items-center gap-2 w-full px-6 py-3 rounded cursor-pointer transition-colors duration-300 active:bg-gray-200">
                    <MediaIcon />
                    <Text>동영상 올리기</Text>
                </Link>
            </div>
        </div>
    )
}
