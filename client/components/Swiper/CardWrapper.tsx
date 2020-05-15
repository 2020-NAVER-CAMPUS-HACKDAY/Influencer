import React, { useEffect } from 'react';
import useStyles from 'components/Swiper/styles';

const CardWrapper: React.FC = (props) => {
  const { children } = props;
  const classes = useStyles(props);

  function setCards(): void {
    const allCards = document.querySelectorAll('.card_container');
    const newCards = document.querySelectorAll('.card_container:not(.removed)');

    // newCards.forEach((card, index) => {
    //   card.style.zIndex = allCards.length - index;
    //   card.style.transform = `scale(${(20 - index) / 20}) translateY(-${30 * index}px)`;
    //   card.style.opacity = (10 - index) / 10;
    // });
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
