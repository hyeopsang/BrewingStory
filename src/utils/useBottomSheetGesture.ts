import { useCallback, useEffect, useState } from 'react';

const useBottomSheetGesture = ({
  contentRef,
  initialHeight,
  maxHeight,
  snapPoints,
  sensitivity = 10,
}) => {
  const [sheetHeight, setSheetHeight] = useState(initialHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(initialHeight);
  const [currentSnapIndex, setCurrentSnapIndex] = useState(0);
  const [dragDirection, setDragDirection] = useState(0); 
  const [lastY, setLastY] = useState(0); 

  const filteredSnapPoints = useCallback(() => {
    return snapPoints; 
  }, [snapPoints]);

  const calculateSnapPoints = useCallback(() => {
    return filteredSnapPoints().map((point) => {
      if (typeof point === 'number' && point <= 100) {
        return (window.innerHeight * point) / 100;
      }
      return point;
    });
  }, [filteredSnapPoints]);

  const findNearestSnapPoint = useCallback(
    (height) => {
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
    },
    [calculateSnapPoints]
  );

  const snapTo = useCallback(
    (indexOrHeight) => {
      const points = calculateSnapPoints();

      if (typeof indexOrHeight === 'number') {
        if (indexOrHeight >= 0 && indexOrHeight < points.length) {
          setSheetHeight(points[indexOrHeight]);
          setCurrentSnapIndex(indexOrHeight);
        } else {
          const { point, index } = findNearestSnapPoint(indexOrHeight);
          setSheetHeight(point);
          setCurrentSnapIndex(index);
        }
      }
    },
    [calculateSnapPoints, findNearestSnapPoint]
  );

  const handleDragStart = useCallback(
    (e) => {
      setIsDragging(true);
      const clientY = e.touches?.[0].clientY || e.clientY;
      setStartY(clientY);
      setLastY(clientY); 
      setStartHeight(sheetHeight);
      setDragDirection(0); 
    },
    [sheetHeight]
  );

  const handleDragMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const currentY = e.touches?.[0].clientY || e.clientY;
      const deltaFromStart = startY - currentY;
      const deltaFromLast = lastY - currentY;

      if (Math.abs(deltaFromLast) > sensitivity) {
        setDragDirection(deltaFromLast > 0 ? 1 : -1);
      }

      const newHeight = Math.max(
        initialHeight,
        Math.min(
          startHeight + deltaFromStart,
          window.innerHeight * (maxHeight / 100)
        )
      );

      setSheetHeight(newHeight);
      setLastY(currentY);

      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const isScrollable = scrollHeight > clientHeight;
        const isAtTop = scrollTop === 0;

        if (isScrollable && !isAtTop && deltaFromStart > 0) {
          setIsDragging(false);
        }
      }
    },
    [
      isDragging,
      initialHeight,
      maxHeight,
      startHeight,
      startY,
      lastY,
      sensitivity,
    ]
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    const points = calculateSnapPoints();
    const currentHeight = sheetHeight;

    const { index: nearestIndex } = findNearestSnapPoint(currentHeight);

    setSheetHeight(points[nearestIndex]);
    setCurrentSnapIndex(nearestIndex);
    setDragDirection(0);
  }, [isDragging, sheetHeight, calculateSnapPoints, findNearestSnapPoint]);

  useEffect(() => {
    if (isDragging) {
      const handleGlobalDragMove = (e) => {
        const currentY = e.clientY;
        const deltaFromStart = startY - currentY;
        const deltaFromLast = lastY - currentY;

        if (Math.abs(deltaFromLast) > sensitivity) {
          if (deltaFromLast > 0) {
            setDragDirection(1);
            const points = calculateSnapPoints();
            setSheetHeight(points[points.length - 1]);
            setCurrentSnapIndex(points.length - 1);
            setIsDragging(false); 
            return;
          }
          setDragDirection(-1);
          const points = calculateSnapPoints();
          setSheetHeight(points[0]); 
          setCurrentSnapIndex(0);
          setIsDragging(false);
          return;
        }

        const newHeight = Math.max(
          initialHeight,
          Math.min(
            startHeight + deltaFromStart,
            window.innerHeight * (maxHeight / 100)
          )
        );

        setSheetHeight(newHeight);
        setLastY(currentY); 
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
  }, [
    isDragging,
    initialHeight,
    maxHeight,
    startHeight,
    startY,
    lastY,
    sensitivity,
    sheetHeight,
    calculateSnapPoints,
    handleDragEnd,
  ]);

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

  useEffect(() => {
    const points = calculateSnapPoints();
    setSheetHeight(points[0]);
    setCurrentSnapIndex(0);
  }, [calculateSnapPoints]);

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
    onMouseLeave: handleDragEnd,
  };

  return {
    sheetHeight,
    isDragging,
    currentSnapIndex,
    dragHandlers,
    snapTo,
    toggleSnap,
  };
};

export default useBottomSheetGesture;
