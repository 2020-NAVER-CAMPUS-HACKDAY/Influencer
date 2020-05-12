import React from 'react';
import Link from 'next/link';
import Layout from 'components/Layout';
import SwiperCard from 'components/Swiper/Card';

const Interaction: React.FC = (props) => {
  // const { children } = props;
  return (
    <Layout>
      <div>
        Interaction Page.
      </div>
      <SwiperCard />
    </Layout>
  );
};

export default Interaction;
