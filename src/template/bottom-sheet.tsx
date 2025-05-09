import React, { useRef, useEffect } from 'react';
import useBottomSheetGesture from '../utils/useBottomSheetGesture';
import { useSelector } from 'react-redux';
import { RootState } from '../app/redux/store';

const BottomSheet = ({ 
  children, 
  initialHeight,
  maxHeight,
  snapPoints,
  onSnapChange,
  className = '',
  borderRadius = 12
}) => {
  const sheetRef = useRef(null);
  const contentRef = useRef(null);
  const selectedPlace = useSelector((state: RootState) => state.selectedPlace);

  // 초기값 설정
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

  // 드래그 비활성화 처리
  const dragProps = selectedPlace ? dragHandlers : {};

  // 스냅 변경 콜백
  useEffect(() => {
    if (onSnapChange && currentSnapIndex !== undefined) {
      onSnapChange(currentSnapIndex);
    }
  }, [currentSnapIndex, onSnapChange]);

  return (
    <div className={`fixed -bottom-[200px] left-1/2 -translate-1/2 w-full max-w-mobile z-[50] ${className}`}>
      <div 
        className={`relative bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] overflow-hidden ${isDragging ? 'transition-none' : 'transition-[height] duration-300 ease-in-out'}`}
        style={{ 
          height: `${sheetHeight}px`,
          borderRadius: `${borderRadius}px ${borderRadius}px 0 0`
        }}
      >
        <div 
          className={`w-full h-[30px] py-[10px] flex justify-center items-center ${selectedPlace ? 'cursor-grab' : 'cursor-default'} select-none touch-none`}
          {...dragProps}
        >
          <div className="w-[40px] h-[3px] bg-gray-300 rounded-[3px]" />
        </div>
        <div 
          ref={contentRef}
          className="h-full overflow-y-auto"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
