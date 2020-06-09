import { useEffect, MutableRefObject, useRef } from 'react';

interface Intersecting {
  isIntersecting: boolean;
}

interface IntersectionObserverParams {
  root?: MutableRefObject<HTMLDivElement>;
  target?: MutableRefObject<HTMLDivElement>;
  onIntersect?: ([{ isIntersecting }]: Intersecting[]) => void;
  threshold?: number;
  rootMargin?: string;
}

export const useInfinityScrollIO: (
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

export const useLazyLoadingIO: (
  params: IntersectionObserverParams,
) => IntersectionObserver = ({ root, threshold = 0, rootMargin = '100px' }) => {
  const observer = useRef(null);

  useEffect(() => {
    if (!root) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target as HTMLImageElement;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove('lazy');
            observer.current.unobserve(lazyImage);
          } else {
            const lazyImage = entry.target as HTMLImageElement;
            lazyImage.src = '';
          }
        });
      },
      {
        root: root.current,
        rootMargin,
        threshold,
      },
    );

    const cleanUp = (): void => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
    return cleanUp;
  }, [root, rootMargin, threshold]);

  return observer.current;
};
