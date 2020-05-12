import React from 'react';
import Swiper from 'components/Swiper';

const Interaction: React.FC = (props) => {
  const { children } = props;
  return (
    <>
      <div>
        Interaction Page.
      </div>
      <Swiper />
    </>
  );
};

export default Interaction;
