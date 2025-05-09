import React, { useRef, useEffect } from 'react';
import useBottomSheetGesture from '../utils/useBottomSheetGesture';
import { useSelector } from 'react-redux';
import { RootState } from '../app/redux/store';

const BottomSheet = ({ 
  children, 
  initialHeight = 30,  // 매우 낮은 초기 높이
  maxHeight = 85,     
  snapPoints = [30, 60, 95], // 낮은 초기값, 컨텐츠 표시, 최대값
  onSnapChange,       
  className = '',      
  borderRadius = 12    
}) => {
  const sheetRef = useRef(null);
  const contentRef = useRef(null);
  const selectedPlace = useSelector((state: RootState) => state.selectedPlace);

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
  
  // selectedPlace가 있을 때만 드래그 핸들러 적용
  const gestureHandlers = selectedPlace ? dragHandlers : {};
  
  // selectedPlace 상태가 변경될 때 스냅 포인트 조정
  useEffect(() => {
    // setTimeout으로 스냅 포인트 변경 지연 적용 (상태 업데이트 후 실행)
    const timer = setTimeout(() => {
      if (selectedPlace) {
        // selectedPlace가 있으면 두 번째 스냅 포인트로 이동 (컨텐츠 표시)
        snapTo(1); // 50vh
      } else {
        // 없으면 첫 번째 스냅 포인트로 이동 (최소)
        snapTo(0); // 5vh
      }
    }, 50); // 약간의 지연을 두어 상태 업데이트가 완료된 후 실행
    
    return () => clearTimeout(timer);
  }, [selectedPlace, snapTo]);
  
  // 스냅 변경 시 콜백 호출
  useEffect(() => {
    if (onSnapChange && currentSnapIndex !== undefined) {
      onSnapChange(currentSnapIndex);
    }
  }, [currentSnapIndex, onSnapChange]);
  
  return (
    <div className={`fixed -bottom-[250px] left-1/2 -translate-x-1/2 w-full max-w-mobile z-[50] ${className}`}>
      <div 
        className={`relative bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] overflow-hidden ${isDragging ? 'transition-none' : 'transition-[height] duration-300 ease-in-out'}`}
        style={{ 
          height: `${sheetHeight}px`,
          borderRadius: `${borderRadius}px ${borderRadius}px 0 0`
        }}
      >
        <div 
          className={`w-full h-[40px] py-[10px] flex justify-center items-center ${selectedPlace ? 'cursor-grab' : 'cursor-default'} select-none touch-none`}
          {...gestureHandlers}
        >
          <div className="w-[40px] h-[3px] bg-gray-300 rounded-[3px]" />
        </div>
        <div 
          ref={contentRef}
          className="max-h-[calc(90vh-20px)] overflow-y-auto"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
