import { useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollOptions {
  rootMargin?: string;
  onIntersect: () => void;
  enabled: boolean;
}

export function useInfiniteScroll({
  rootMargin = '100px',
  onIntersect,
  enabled,
}: UseInfiniteScrollOptions) {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !onIntersect) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin }
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [target, enabled, onIntersect, rootMargin]);

  return { setTarget, observerRef };
}
