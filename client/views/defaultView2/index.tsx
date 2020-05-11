import React from 'react';
import Head from 'next/head';
import useStyles from 'views/defaultView2/styles';

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
        This is Default 2 - example 1 Page.
      </div>
      {data}
    </>
  );
};

export default Home;
