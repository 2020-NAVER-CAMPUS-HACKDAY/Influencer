import React, { useEffect } from 'react';
import useStyles from 'components/Swiper/styles';

const CardWrapper: React.FC = (props) => {
  const { children } = props;
  const classes = useStyles(props);

  function setCards(): void {
    // : 예를 들어 10개 데이터 받으면, z-index와 opacity 등등 적용해서 정렬함
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
