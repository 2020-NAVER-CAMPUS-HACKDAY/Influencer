import React from 'react';
import Link from 'next/link';

import Layout from 'components/Layout';

interface DefaultProps {
  data: string;
}

const Home: React.FunctionComponent<DefaultProps> = (props) => {
  const { data } = props;

  return (
    <Layout>
      <div>
        This is Default 2 - example 1 Page.
      </div>
      <Link href="/routeExample">
        <a>back to Page</a>
      </Link>
      {data}
    </Layout>
  );
};

export default Home;
