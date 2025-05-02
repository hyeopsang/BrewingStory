import { ImageIcon } from "./image-icon";
import MediaIcon from "./media-icon";

export function SelectTemplate() {
    return (
        <div className="absolute left-0 bottom-0 w-full p-3 h-[200px] bg-white shadow-2xl flex flex-col justify-center items-center text-[#232323] text-sm font-bold">
            <h2>Upload</h2>
            <ul className="flex flex-col justify-center items-center w-full h-full bg-white text-[#232323] text-sm font-bold">
                <li className="flex justify-center items-center w-full">
                    <ImageIcon />
                    <p>사진 올리기</p>
                </li>
                <li className="flex justify-center items-center w-full">
                    <MediaIcon/>
                    <p>동영상 올리기</p>
                </li>
            </ul>
        </div>
    )
}
