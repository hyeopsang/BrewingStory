import type { RootState } from '@app/redux/store';
import { useBottomSheetGesture } from '@utils/useBottomSheetGesture';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export const BottomSheet = ({
  children,
  initialHeight,
  maxHeight,
  snapPoints,
  onSnapChange,
  className = '',
  borderRadius = 12,
}) => {
  const contentRef = useRef(null);
  const selectedPlace = useSelector((state: RootState) => state.selectedPlace);

  const { sheetHeight, dragHandlers, currentSnapIndex, isDragging } =
    useBottomSheetGesture({
      contentRef,
      initialHeight,
      maxHeight,
      snapPoints,
    });

  const dragProps = selectedPlace ? dragHandlers : {};

  useEffect(() => {
    if (onSnapChange && currentSnapIndex !== undefined) {
      onSnapChange(currentSnapIndex);
    }
  }, [currentSnapIndex, onSnapChange]);

  return (
    <div
      className={`max-w-mobile fixed left-1/2 z-[50] w-full -translate-1/2 ${className}`}
    >
      <div
        className={`relative overflow-hidden bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] ${isDragging ? 'transition-none' : 'transition-[height] duration-300 ease-in-out'}`}
        style={{
          height: `${sheetHeight}px`,
          borderRadius: `${borderRadius}px ${borderRadius}px 0 0`,
        }}
      >
        <div
          className={`flex w-full cursor-grab touch-none items-center justify-center select-none sm:h-7 md:h-7 lg:h-7`}
          {...dragProps}
        >
          <div className="h-[3px] rounded-[3px] bg-gray-200 sm:w-10 md:w-10 lg:w-[50px]" />
        </div>
        <div ref={contentRef} className="h-fit overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
