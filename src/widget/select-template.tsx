import { ImageIcon } from "./image-icon";
import MediaIcon from "./media-icon";

export function SelectTemplate() {
    return (
        <div className="w-full py-6 h-fit flex flex-col gap-6 items-center text-[#232323] text-sm font-bold">
            <h2 className="text-center">Upload</h2>

            <ul className="flex flex-col items-start w-full bg-white text-[#232323] text-sm font-bold">
                <li className="flex items-center gap-2 w-full px-6 py-3 rounded cursor-pointer transition-colors duration-300 active:bg-gray-200">
                <ImageIcon />
                <p>사진 올리기</p>
                </li>
                <li className="flex items-center gap-2 w-full px-6 py-3 rounded cursor-pointer transition-colors duration-300 active:bg-gray-200">
                <MediaIcon />
                <p>동영상 올리기</p>
                </li>
            </ul>
        </div>
    )
}
