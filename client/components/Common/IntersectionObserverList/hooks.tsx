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
  threshold = 0.5,
  rootMargin = '0px',
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      root: root.current,
      rootMargin,
      threshold,
    });
    const currentTarget = target.current;
    if (!target) return;
    observer.observe(currentTarget);

    const cleanUp = (): void => observer.unobserve(currentTarget);
    return cleanUp;
  }, [target, root, rootMargin, onIntersect, threshold]);
};
