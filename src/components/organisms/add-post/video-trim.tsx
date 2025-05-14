import { Input } from '@atoms/elements/Input';
import { PlusSquare } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import { useVideoThumbnail } from './useVideoThumbnail';

interface VideoTrimProps {
  onTrim: (file: File, url: string, thumbnail: File) => void;
}

export function VideoTrim({ onTrim }: VideoTrimProps) {
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  const { thumbnail, thumbnailFile } = useVideoThumbnail({
    videoRef,
    canvasRef,
  });

  // thumbnailFile이 준비되면 onTrim 호출
  useEffect(() => {
    if (selectedFile && fileUrl && thumbnailFile) {
      onTrim(selectedFile, fileUrl, thumbnailFile);
    }
  }, [selectedFile, fileUrl, thumbnailFile, onTrim]);

  const handleFileChange = (media) => {
    const file = media.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setFileUrl(url);

    const video = videoRef.current;
    video.src = url;
    video.load();
    // onTrim 직접 호출 제거 - thumbnailFile이 준비된 후 useEffect에서 호출됨
  };

  return (
    <div>
      <Input
        className="hidden"
        inputType="file"
        accept="video/*"
        onChange={handleFileChange}
        ref={inputRef}
      />
      <video
        ref={videoRef}
        style={{ display: 'none' }}
        className="hidden"
        crossOrigin="anonymous"
      />
      {thumbnail && thumbnail.length > 100 ? (
        <img
          src={thumbnail}
          alt="썸네일 미리보기"
          className="mx-auto aspect-[9/16] w-1/2 rounded-2xl"
        />
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="button-style mx-auto flex aspect-[9/16] w-1/2 items-center justify-center gap-4 rounded-2xl bg-neutral-200 py-4 font-bold text-white"
        >
          <PlusSquare />
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
