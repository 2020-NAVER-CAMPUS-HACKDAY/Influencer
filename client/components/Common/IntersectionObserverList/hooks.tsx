import { useEffect, MutableRefObject } from 'react';

interface Intersecting {
  isIntersecting: boolean;
}

interface IntersectionObserverParams {
  root?: MutableRefObject<HTMLDivElement>;
  target: MutableRefObject<HTMLDivElement>;
  onIntersect: ([{ isIntersecting }]: Intersecting[]) => void;
  threshold?: number;
  rootMargin?: string;
}

export const useIntersectionObserver: (
  params: IntersectionObserverParams,
) => void = ({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin,
      threshold,
    });

    if (!target) return;
    observer.observe(target.current);

    const cleanUp = (): void => observer.unobserve(target.current);
    return cleanUp;
  }, [target, root, rootMargin, onIntersect, threshold]);
};
