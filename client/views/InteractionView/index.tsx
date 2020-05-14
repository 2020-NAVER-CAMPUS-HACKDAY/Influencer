import React from 'react';
import Link from 'next/link';
import Layout from 'components/Layout';
import Swiper from 'components/Swiper';

const Interaction: React.FC = (props) => {
  // const { children } = props;
  return (
    <Layout>
      <div>
        Interaction Page.
      </div>
      <Swiper />
    </Layout>
  );
};

export default Interaction;
