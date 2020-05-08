import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Layout from 'components/Layout';

interface DefaultProps {
  data: string;
}

const Home: React.FunctionComponent<DefaultProps> = (props) => {
  const { data } = props;

  return (
    <Layout>
      <Head>
        <title>Influencer</title>
      </Head>
      <div>
        This is Default Page.
      </div>
      <Link href="/routeExample/example1">
        <a>go to Next Page</a>
      </Link>
      {data}
    </Layout>
  );
};

export default Home;
