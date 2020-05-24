import React, { useRef, useState, FC } from 'react';
import { useIntersectionObserver } from 'components/Common/IntersectionObserverList/hooks';
import Loading from 'components/Common/IntersectionObserverList/Loading';
import clsx from 'clsx';
import useStyles from './styles';

export interface IntersectionObserverListProps {
  fetchApi: () => Promise<void>;
  className?: string;
  firstFetchingTrue?: boolean;
  isFetchTrue: boolean;
}

const IntersectionObserverList: FC<IntersectionObserverListProps> = (
    {
      fetchApi,
      children,
      className,
      firstFetchingTrue,
      isFetchTrue,
    },
) => {
  const root = useRef(null);
  const target = useRef(null);
  const classes = useStyles();

  const [loading, setLoading] = useState<boolean>(false);

  const loadItems = async (): Promise<void> => {
    if (loading) return;
    if (isFetchTrue && (firstFetchingTrue === undefined || firstFetchingTrue)) {
      setLoading(true);
      await fetchApi();
      setLoading(false);
    }
  };

  const onIntersect = ([{ isIntersecting }]): void => {
    if (!isIntersecting) return;
    loadItems();
  };

  useIntersectionObserver({
    root,
    target,
    onIntersect,
  });

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={clsx(classes.wrapper, className)}>
          {children}
        </div>
      </div>
      {loading && <Loading />}
      <div ref={target} />
    </React.Fragment>
  );
};

export default IntersectionObserverList;
