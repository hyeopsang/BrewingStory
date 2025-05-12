import { useState, useEffect, useCallback } from 'react';

const useBottomSheetGesture = ({ 
  contentRef,
  initialHeight,
  maxHeight,
  snapPoints,
  sensitivity = 10 
}) => {
  const [sheetHeight, setSheetHeight] = useState(initialHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(initialHeight);
  const [currentSnapIndex, setCurrentSnapIndex] = useState(0);
  const [dragDirection, setDragDirection] = useState(0); // 1: 위로, -1: 아래로, 0: 변화 없음
  const [lastY, setLastY] = useState(0); // 👈 마지막 Y 위치 추가
  
  // 중간 포인트 포함하도록 변경
const filteredSnapPoints = useCallback(() => {
  return snapPoints; // 전체 포인트 사용
}, [snapPoints]);


  
  // 스냅 포인트 계산 (vh를 픽셀로 변환)
  const calculateSnapPoints = useCallback(() => {
    return filteredSnapPoints().map(point => {
      if (typeof point === 'number' && point <= 100) {
        return (window.innerHeight * point) / 100;
      }
      return point;
    });
  }, [filteredSnapPoints]);
  
  // 가장 가까운 스냅 포인트 찾기
  const findNearestSnapPoint = useCallback((height) => {
    const points = calculateSnapPoints();
    let nearestPoint = points[0];
    let minDistance = Math.abs(height - points[0]);
    let snapIndex = 0;
    
    points.forEach((point, index) => {
      const distance = Math.abs(height - point);
      if (distance < minDistance) {
        minDistance = distance;
        nearestPoint = point;
        snapIndex = index;
      }
    });
    
    return { point: nearestPoint, index: snapIndex };
  }, [calculateSnapPoints]);
  
  // 특정 스냅 포인트로 이동
  const snapTo = useCallback((indexOrHeight) => {
    const points = calculateSnapPoints();
    
    if (typeof indexOrHeight === 'number') {
      if (indexOrHeight >= 0 && indexOrHeight < points.length) {
        // 인덱스로 접근
        setSheetHeight(points[indexOrHeight]);
        setCurrentSnapIndex(indexOrHeight);
      } else {
        // 높이로 접근
        const { point, index } = findNearestSnapPoint(indexOrHeight);
        setSheetHeight(point);
        setCurrentSnapIndex(index);
      }
    }
  }, [calculateSnapPoints, findNearestSnapPoint]);
  
  // 드래그 시작
  const handleDragStart = useCallback((e) => {
    setIsDragging(true);
    const clientY = e.touches?.[0].clientY || e.clientY;
    setStartY(clientY);
    setLastY(clientY); // 👈 마지막 Y 위치 초기화
    setStartHeight(sheetHeight);
    setDragDirection(0); // 드래그 방향 초기화
  }, [sheetHeight]);
  
  // 드래그 중
const handleDragMove = useCallback((e) => {
  if (!isDragging) return;

  const currentY = e.touches?.[0].clientY || e.clientY;
  const deltaFromStart = startY - currentY;
  const deltaFromLast = lastY - currentY;

  // 방향 감지만 함 (즉시 점프 제거)
  if (Math.abs(deltaFromLast) > sensitivity) {
    setDragDirection(deltaFromLast > 0 ? 1 : -1);
  }

  // 새로운 높이 계산
  const newHeight = Math.max(
    initialHeight,
    Math.min(startHeight + deltaFromStart, window.innerHeight * (maxHeight / 100))
  );

  setSheetHeight(newHeight);
  setLastY(currentY);

  // 컨텐츠 내부 스크롤 여부에 따른 드래그 차단
  if (contentRef.current) {
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const isScrollable = scrollHeight > clientHeight;
    const isAtTop = scrollTop === 0;

    if (isScrollable && !isAtTop && deltaFromStart > 0) {
      setIsDragging(false);
    }
  }
}, [isDragging, initialHeight, maxHeight, startHeight, startY, lastY, sensitivity]);

 
  // 드래그 종료
const handleDragEnd = useCallback(() => {
  if (!isDragging) return;

  setIsDragging(false);

  const points = calculateSnapPoints();
  const currentHeight = sheetHeight;

  // 가장 가까운 포인트를 찾는다
  const { index: nearestIndex } = findNearestSnapPoint(currentHeight);

  setSheetHeight(points[nearestIndex]);
  setCurrentSnapIndex(nearestIndex);
  setDragDirection(0);
}, [isDragging, sheetHeight, calculateSnapPoints, findNearestSnapPoint]);

  
  // 전역 마우스 이벤트 리스너 추가
  useEffect(() => {
    if (isDragging) {
      const handleGlobalDragMove = (e) => {
        const currentY = e.clientY;
        const deltaFromStart = startY - currentY;
        const deltaFromLast = lastY - currentY;
        
        // 마지막 위치에서 현재 위치까지의 변화로 방향 감지 (더 민감하게)
        if (Math.abs(deltaFromLast) > sensitivity) {
          if (deltaFromLast > 0) {
            // 위로 드래그 감지 - 즉시 마지막 스냅 포인트로 이동
            setDragDirection(1);
            const points = calculateSnapPoints();
            setSheetHeight(points[points.length - 1]);
            setCurrentSnapIndex(points.length - 1);
            setIsDragging(false); // 드래그 종료
            return;
          } else {
            setDragDirection(-1);
            const points = calculateSnapPoints();
            setSheetHeight(points[0]); // 수정 필요
            setCurrentSnapIndex(0);
            setIsDragging(false);
            return;
          }
        }
        
        // 일반적인 높이 계산
        const newHeight = Math.max(initialHeight, 
                                Math.min(startHeight + deltaFromStart, 
                                      window.innerHeight * (maxHeight / 100)));
        
        setSheetHeight(newHeight);
        setLastY(currentY); // 마지막 Y 위치 업데이트
      };
      
      const handleGlobalDragEnd = () => {
        handleDragEnd();
      };
      
      document.addEventListener('mousemove', handleGlobalDragMove);
      document.addEventListener('mouseup', handleGlobalDragEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalDragMove);
        document.removeEventListener('mouseup', handleGlobalDragEnd);
      };
    }
  }, [isDragging, initialHeight, maxHeight, startHeight, startY, lastY, sensitivity, sheetHeight, calculateSnapPoints, handleDragEnd]);
  
  // 윈도우 크기 변경 시 업데이트
  useEffect(() => {
    const handleResize = () => {
      const points = calculateSnapPoints();
      if (currentSnapIndex >= 0 && currentSnapIndex < points.length) {
        setSheetHeight(points[currentSnapIndex]);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateSnapPoints, currentSnapIndex]);
  
  // 초기 높이 설정
  useEffect(() => {
    const points = calculateSnapPoints();
    setSheetHeight(points[0]);
    setCurrentSnapIndex(0);
  }, [calculateSnapPoints]);
  
  // 토글 기능
  const toggleSnap = useCallback(() => {
    const points = calculateSnapPoints();
    if (currentSnapIndex === 0) {
      setSheetHeight(points[points.length - 1]);
      setCurrentSnapIndex(points.length - 1);
    } else {
      setSheetHeight(points[0]);
      setCurrentSnapIndex(0);
    }
  }, [calculateSnapPoints, currentSnapIndex]);
  
  const dragHandlers = {
    onTouchStart: handleDragStart,
    onTouchMove: handleDragMove,
    onTouchEnd: handleDragEnd,
    onMouseDown: handleDragStart,
    onMouseLeave: handleDragEnd
  };
  
  return {
    sheetHeight,
    isDragging,
    currentSnapIndex,
    dragHandlers,
    snapTo,
    toggleSnap
  };
};

export default useBottomSheetGesture;
