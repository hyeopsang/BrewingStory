import { useState, useEffect, useRef } from "react";
import { formattedImage } from "../profile/formattedImage";
import { Plus, PlusSquare, X } from "lucide-react";
export function PhotoEdit (){
    const [images, setImages] = useState<File[]>([]);
    const imageRef = useRef<HTMLInputElement>(null);

    const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files && files.length > 0) {
            const selectedFiles = Array.from(files).slice(0, 5);

            const formattedFiles = await Promise.all(
                selectedFiles.map(file => formattedImage(file))
            );

            setImages((prev) => [
                ...(Array.isArray(files) ? files : [files]),
                ...prev
              ]);        
            }
    };
    const deleteImage = (index: number) => {
        const deleteImage = images.filter((_, idx) => idx !== index);
        setImages(deleteImage);
    }
    

    return (
        <div className="w-full h-dvh px-6 py-4 bg-white">
            <div className="flex items-start gap-2">
                {/* ➕ 고정된 추가 버튼 */}
                <button
                type="button"
                onClick={() => imageRef.current?.click()}
                className="w-[150px] aspect-[9/16] text-white font-bold bg-gray-200 py-4 button-style rounded-2xl text-sm flex justify-center items-center gap-4 shrink-0"
                >
                <PlusSquare />
                </button>

                {/* 📜 가로 스크롤 영역 */}
                <div className="overflow-x-auto s flex-1">
                <ul className="flex gap-2 flex-nowrap">
                    {images.map((file, index) => (
                    <li key={index} className="relative w-[150px] aspect-[9/16] rounded-2xl overflow-hidden shrink-0">
                        <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover rounded"
                        />
                        <button
                        type="button"
                        onClick={() => deleteImage(index)}
                        className="absolute top-3 right-3 bg-neutral-900 text-white text-xs p-1 rounded-full"
                        >
                        <X className="w-3 h-3" />
                        </button>
                    </li>
                    ))}
                </ul>
                </div>
            </div>

            {/* 파일 선택 input */}
            <input
                className="hidden"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleChangeImage}
                ref={imageRef}
                multiple
            />
    </div>
    )
}
//https://medium.com/@raedswan121/how-to-upload-image-and-preview-it-using-reactjs-43b27c751255
