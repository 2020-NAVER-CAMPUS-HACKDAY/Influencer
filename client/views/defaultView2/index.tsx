import Head from 'next/head';
// eslint-disable-next-line import/extensions
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
        This is Default 2 - example 1 Page.
      </div>
      {data}
    </Layout>
  );
};

export default Home;
