import { useState, useEffect } from "react";
import { formattedImage } from "../profile/formattedImage";

export function PhotoEdit (){
    const [images, setImages] = useState<File[]>([]);

    const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(images.length > 6 ) return
        const files = e.target.files;
        if (files && files.length > 0) {
            const fileArray = Array.from(files);

            const formattedFiles = await Promise.all(
            fileArray.map(file => formattedImage(file))
            );

            setImages(formattedFiles);
        }
    };
    useEffect(() => {
        const objectUrls = images.map(file => URL.createObjectURL(file));
      
        return () => {
          objectUrls.forEach(url => URL.revokeObjectURL(url));
        };
      }, [images]);
      

    return (
        <div className="w-full px-6 py-4">
            <input type="file" onChange={handleChangeImage} />
            {images.map((imageFile, idx) => (
                <img
                    key={idx}
                    src={URL.createObjectURL(imageFile)}
                    alt={`업로드된 이미지 ${idx + 1}`}
                    style={{ width: 200, height: "auto" }}
                />
                ))}
        </div>
    )
}
//https://medium.com/@raedswan121/how-to-upload-image-and-preview-it-using-reactjs-43b27c751255