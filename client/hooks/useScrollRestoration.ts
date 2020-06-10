import { useEffect } from 'react';
import Router from 'next/router';

const useScrollRestoration = (): void => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
      const cachedScrollPositions = [];
      let shouldScrollRestore;

      Router.events.on('routeChangeStart', () => {
        cachedScrollPositions.push([window.scrollX, window.scrollY]);
      });

      Router.events.on('routeChangeComplete', () => {
        if (shouldScrollRestore) {
          const { x, y } = shouldScrollRestore;
          window.scrollTo(x, y);
          shouldScrollRestore = false;
        }
      });

      Router.beforePopState(() => {
        if (!cachedScrollPositions.length) return true;

        const [x, y] = cachedScrollPositions.pop();
        shouldScrollRestore = { x, y };

        return true;
      });
    }
  }, []);
};

export default useScrollRestoration;
