import React from 'react';
import Link from 'next/link';
import Layout from 'components/Layout';

const Interaction: React.FC = (props) => {
  const { children } = props;
  return (
    <Layout>
      <div>
        Interaction Page.
      </div>
    </Layout>
  );
};

export default Interaction;
