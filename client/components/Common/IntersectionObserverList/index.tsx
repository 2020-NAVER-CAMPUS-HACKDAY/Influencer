import React, { useRef, useState, FC } from 'react';
import { useIntersectionObserver } from 'components/Common/IntersectionObserverList/hooks';
import Loading from 'components/Common/IntersectionObserverList/Loading';
import clsx from 'clsx';
import useStyles from './styles';

interface IntersectionObserverListProps {
  fetchApi: (page?: number) => Promise<void>;
  className?: string;
}

const IntersectionObserverList: FC<IntersectionObserverListProps> = (
    {
      fetchApi,
      children,
      className,
    },
) => {
  const root = useRef();
  const target = useRef();
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadItems = async (pageCount: number): Promise<void> => {
    if (loading) return;

    setLoading(true);
    await fetchApi(pageCount);
    setLoading(false);
  };

  const onIntersect = ([{ isIntersecting }]): void => {
    if (!isIntersecting) return;
    loadItems(page);
    setPage(page + 1);
  };

  useIntersectionObserver({
    root,
    target,
    onIntersect,
  });

  return (
    <React.Fragment>
      <div ref={root} className={classes.container}>
        <div className={clsx(classes.wrapper, className)}>{children}</div>
      </div>
      {loading && <Loading />}
      <div ref={target} />
    </React.Fragment>
  );
};

export default IntersectionObserverList;
