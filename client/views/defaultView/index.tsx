import Head from 'next/head';
import Link from 'next/link';
// eslint-disable-next-line import/extensions
import useStyles from './styles';

interface DefaultProps {
  data: string;
}

const Home: React.FunctionComponent<DefaultProps> = (props) => {
  const { data } = props;
  const classes = useStyles(props);

  return (
    <>
      <Head>
        <title>Influencer</title>
      </Head>
      <div className={classes.root}>
        This is Default Page.
      </div>
      <Link href="/routeExample/example1">
        <a>go to Next Page</a>
      </Link>
      {data}
    </>
  );
};

export default Home;
