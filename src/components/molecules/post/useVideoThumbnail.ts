import { useEffect, useState } from 'react';

interface UseVideoThumbnailProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export function useVideoThumbnail({
  videoRef,
  canvasRef,
}: UseVideoThumbnailProps) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null); // 파일 상태 추가

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!video || !canvas || !ctx) return;

    video.oncanplay = () => {
      video.currentTime = 0.2; // 비디오의 0.2초 지점으로 이동
    };

    video.onseeked = () => {
      // 비디오의 특정 시간으로 이동한 후 캔버스에 그림을 그립니다.
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setThumbnail(dataUrl); // 썸네일 설정

      // Data URL을 Blob으로 변환하여 파일 객체를 생성
      const byteString = atob(dataUrl.split(',')[1]);
      const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([uintArray], { type: mimeString });
      const file = new File([blob], 'thumbnail.jpg', { type: mimeString });
      setThumbnailFile(file); // 썸네일 파일 설정
    };
  }, []);

  return { thumbnail, thumbnailFile };
}
