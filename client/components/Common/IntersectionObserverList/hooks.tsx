import { useEffect, MutableRefObject, useState } from 'react';

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
) => IntersectionObserver = ({
  root,
  threshold = 0,
  rootMargin = '100px',
}) => {
  const [observer, setObserver] = useState<IntersectionObserver>();

  useEffect(() => {
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target as HTMLImageElement;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove('lazy');
            io.unobserve(lazyImage);
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

    setObserver(io);

    const cleanUp = (): void => {
      if (io) {
        io.disconnect();
      }
    };
    return cleanUp;
  }, [root, rootMargin, threshold]);

  return observer;
};
