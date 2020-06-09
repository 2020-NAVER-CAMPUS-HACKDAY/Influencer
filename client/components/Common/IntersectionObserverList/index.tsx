import React, {
  useRef,
  useState,
  FC,
  useEffect,
  Fragment,
} from 'react';
import {
  useInfinityScrollIO,
  useLazyLoadingIO,
} from 'components/Common/IntersectionObserverList/hooks';
import Loading from 'components/Common/Loading';
import clsx from 'clsx';
import useStyles from './styles';

export interface IntersectionObserverListProps {
  fetchApi: () => Promise<void>;
  className?: string;
  firstFetchingTrue?: boolean;
  isFetchTrue: boolean;
  isLazyLoading?: boolean;
  items?: object[];
}

const IntersectionObserverList: FC<IntersectionObserverListProps> = ({
  fetchApi,
  children,
  className,
  firstFetchingTrue,
  isFetchTrue,
  isLazyLoading,
  items,
}) => {
  const root = useRef(null);
  const target = useRef(null);
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);

  const loadItems = async (): Promise<void> => {
    if (loading || !isFetchTrue || firstFetchingTrue === false) return;

    setLoading(true);
    await fetchApi();
    setLoading(false);
  };

  const onIntersect = ([{ isIntersecting }]): void => {
    if (!isIntersecting) return;
    loadItems();
  };

  useInfinityScrollIO({
    target,
    onIntersect,
  });

  const lazyLoadingObserver = useLazyLoadingIO({ root });

  useEffect(() => {
    if (isLazyLoading) {
      const lazyLoading = (): void => {
        const images = Array.from(
          document.getElementsByClassName('lazy'),
        );
        images.forEach((image) => lazyLoadingObserver.observe(image));
      };
      lazyLoading();
    }
  }, [items, isLazyLoading, lazyLoadingObserver]);

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={clsx(classes.wrapper, className)}>
          {children}
        </div>
      </div>
      {loading && <Loading />}
      <div ref={target} />
    </Fragment>
  );
};

export default IntersectionObserverList;
