import Head from 'next/head';
// eslint-disable-next-line import/extensions
import * as S from './styles';

interface DefaultProps {
  data: string;
}

const Home: React.FunctionComponent<DefaultProps> = (props) => {
  const { data } = props;

  return (
    <>
      <Head>
        <title>Influencer</title>
      </Head>
      <S.CustomStyle>
        This is Default 2 - example 1 Page.
      </S.CustomStyle>
      {data}
    </>
  );
};

export default Home;
