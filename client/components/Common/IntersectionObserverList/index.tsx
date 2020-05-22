import React, { useRef, useState, FC } from 'react';
import { useIntersectionObserver } from './hooks';
import Loading from './Loading';
import useStyles from './styles';

interface IntersectionObserverListProps {
  fetchApi: (page?: number) => Promise<void>;
}

const IntersectionObserverList: FC<IntersectionObserverListProps> = ({
  fetchApi,
  children,
}) => {
  const root = useRef();
  const target = useRef();
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadItems = async (page: number) => {
    if (loading) return;

    setLoading(true);
    await fetchApi(page);
    setLoading(false);
  };

  const onIntersect = ([{ isIntersecting }]) => {
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
