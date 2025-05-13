import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/redux/store";
import useBottomSheetGesture from "../../utils/useBottomSheetGesture";

const BottomSheet = ({
	children,
	initialHeight,
	maxHeight,
	snapPoints,
	onSnapChange,
	className = "",
	borderRadius = 12,
}) => {
	const sheetRef = useRef(null);
	const contentRef = useRef(null);
	const selectedPlace = useSelector((state: RootState) => state.selectedPlace);

	const { sheetHeight, dragHandlers, snapTo, currentSnapIndex, isDragging } =
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
			className={`-bottom-[200px] -translate-1/2 fixed left-1/2 z-[50] w-full max-w-mobile ${className}`}
		>
			<div
				className={`relative overflow-hidden bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] ${isDragging ? "transition-none" : "transition-[height] duration-300 ease-in-out"}`}
				style={{
					height: `${sheetHeight}px`,
					borderRadius: `${borderRadius}px ${borderRadius}px 0 0`,
				}}
			>
				<div
					className={`flex w-full items-center justify-center sm:h-7 md:h-7 lg:h-7 ${selectedPlace ? "cursor-grab" : "cursor-default"} touch-none select-none`}
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

export default BottomSheet;
