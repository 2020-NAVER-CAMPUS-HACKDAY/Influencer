import React, { useEffect } from 'react';
import useStyles from 'components/Swiper/styles';

const CardWrapper: React.FC = (props) => {
  const { children } = props;
  const classes = useStyles(props);

  function setCards(): void {
    // TODO(geurim): 데이터 z-index, opacity 등 적용하여 정렬하는 함수
  }

  useEffect(() => {
    setCards();
  });

  return (
    <div className={classes.containerWrapper}>
      <div className={classes.container}>
        {children}
      </div>
    </div>
  );
};

export default CardWrapper;
