import { useState, useEffect, useRef } from "react";
import { formattedImage } from "../profile/formattedImage";
import { Plus, PlusSquare, X } from "lucide-react";
import { CafeAdd } from "./cafe-add";
export function PhotoEdit (){
    const [images, setImages] = useState<File[]>([]);
    const imageRef = useRef<HTMLInputElement>(null);

    const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
    
        const maxSelectable = 5 - images.length;
        if (maxSelectable <= 0) return; 
        const selectedFiles = files.slice(0, maxSelectable);
    
        const formattedFiles = await Promise.all(
            selectedFiles.map(file => formattedImage(file))
        );
    
        setImages((prev) => [...prev, ...formattedFiles]);
    };
    
    const deleteImage = (index: number) => {
        const deleteImage = images.filter((_, idx) => idx !== index);
        setImages(deleteImage);
    }
    

    return (
        <div className="w-full h-dvh px-6 py-4 bg-white">
            <div className="flex items-start gap-1">
                
                <div className="overflow-x-auto flex-1" style={{scrollbarWidth: "none"}}>
                <ul className="flex gap-3 flex-nowrap" >
                    <li
                    onClick={() => imageRef.current?.click()}
                    className="w-1/4 aspect-[9/16] text-white font-bold bg-neutral-200 py-4 button-style text-sm flex justify-center items-center gap-4 shrink-0"
                    >
                    <PlusSquare />
                    </li>
                    {images.map((file, index) => (
                    <li key={index} className="relative w-1/4 aspect-[9/16] overflow-hidden shrink-0">
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
                        <X className="w-4 h-4" />
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
            <CafeAdd />
    </div>
    )
}
//https://medium.com/@raedswan121/how-to-upload-image-and-preview-it-using-reactjs-43b27c751255
