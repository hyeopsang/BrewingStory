// BottomSheet.jsx
import React, { useRef, useEffect } from 'react';
import useBottomSheetGesture from './useBottomSheetGesture';

const BottomSheet = ({ 
  children, 
  initialHeight = 70,  // 기본 표시 높이
  maxHeight = 85,      // 최대 높이 (vh 단위)
  snapPoints = [70, 50, 85], // 스냅 포인트 (픽셀 또는 vh 퍼센트)
  onSnapChange,        // 스냅 변경 콜백
  className = '',      // 추가 클래스
  borderRadius = 12    // 상단 테두리 반경
}) => {
  const sheetRef = useRef(null);
  const contentRef = useRef(null);
  
  // 제스처 관련 훅 사용
  const { 
    sheetHeight, 
    dragHandlers,
    snapTo,
    currentSnapIndex,
    isDragging
  } = useBottomSheetGesture({
    contentRef,
    initialHeight,
    maxHeight,
    snapPoints
  });
  
  // 스냅 변경 시 콜백 호출
  useEffect(() => {
    if (onSnapChange && currentSnapIndex !== undefined) {
      onSnapChange(currentSnapIndex);
    }
  }, [currentSnapIndex, onSnapChange]);
  
  return (
    <div className={`fixed -bottom-[200px] left-1/2 -translate-1/2 w-full max-w-mobile  z-[50] ${className}`}>
      <div 
        className={`relative bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] overflow-hidden ${isDragging ? 'transition-none' : 'transition-[height] duration-300 ease-in-out'}`}
        style={{ 
          height: `${sheetHeight}px`,
          borderRadius: `${borderRadius}px ${borderRadius}px 0 0`
        }}
      >
        <div 
          className="w-full h-[30px] py-[10px] flex justify-center items-center cursor-grab select-none touch-none"
          {...dragHandlers}
        >
          <div className="w-[40px] h-[3px] bg-gray-300 rounded-[3px]" />
        </div>
        <div 
          ref={contentRef}
          className="h-[200px] overflow-y-auto"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
