import React, { useEffect } from 'react';

export const useIntersectionObserver = ({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      root: root.currnet,
      rootMargin,
      threshold,
    });

    observer.observe(target.current);

    return () => {
      observer.unobserve(target.current);
    };
  }, [target, root, rootMargin, onIntersect, threshold]);
};
