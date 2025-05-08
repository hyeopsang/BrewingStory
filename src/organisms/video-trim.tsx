import React, { useRef, useState } from "react";
import { PlusSquare } from "lucide-react";
import { Image } from "../atoms/Image";
import { Input } from "../atoms/Input";

interface VideoTrimProps {
    onTrim: (file: File, url: string) => void;
}

export function VideoTrim({ onTrim } : VideoTrimProps) {
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnail(null);

    onTrim(file, URL.createObjectURL(file));

    const video = videoRef.current;
    video.src = URL.createObjectURL(file);
    video.load();
  };

  const handleLoadedData = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0.1;
    }
  };

  const handleSeeked = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setThumbnail(canvas.toDataURL("image/jpeg"));
  };

  return (
    <div>
      <Input
        className="hidden"
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        ref={inputRef}
      />
      <video
        ref={videoRef}
        style={{ display: "none" }}
        className="hidden"
        onLoadedData={handleLoadedData}
        onSeeked={handleSeeked}
        crossOrigin="anonymous"
      />
      {thumbnail ? (
        <Image src={thumbnail} alt="썸네일 미리보기" className="w-1/2 aspect-[9/16] mx-auto rounded-2xl"/>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="w-1/2 mx-auto aspect-[9/16] text-white font-bold bg-neutral-200 py-4 button-style flex justify-center items-center gap-4 rounded-2xl"
        >
          <PlusSquare />
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
