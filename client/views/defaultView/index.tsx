import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import useStyles from 'views/defaultView';

interface DefaultProps {
  data: string;
}

const Home: React.FC<DefaultProps> = (props) => {
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
