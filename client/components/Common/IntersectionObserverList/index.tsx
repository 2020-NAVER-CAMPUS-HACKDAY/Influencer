import React, { useRef, useState, FC } from 'react';
import { useIntersectionObserver } from 'components/Common/IntersectionObserverList/hooks';
import Loading from 'components/Common/IntersectionObserverList/Loading';
import useStyles from 'components/Common/IntersectionObserverList/styles';

interface IntersectionObserverListProps {
  fetchApi: (page?: number) => Promise<void>;
}

const IntersectionObserverList: FC<IntersectionObserverListProps> = ({
  fetchApi,
  children,
}) => {
  const root = useRef<HTMLDivElement>();
  const target = useRef<HTMLDivElement>();
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadItems: (_page: number) => Promise<void> = async (_page: number) => {
    if (loading) return;

    setLoading(true);
    await fetchApi(_page);
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
        <div className={classes.wrapper}>{children}</div>
      </div>
      {loading && <Loading />}
      <div ref={target} />
    </React.Fragment>
  );
};

export default IntersectionObserverList;
