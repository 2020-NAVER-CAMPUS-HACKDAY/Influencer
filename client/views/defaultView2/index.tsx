import React, { FC } from 'react';
import Link from 'next/link';
import MainHeader from 'components/Main/MainHeader';

interface DefaultProps {
  data: string;
}

const Home: FC<DefaultProps> = (props) => {
  const { data } = props;

  return (
    <MainHeader>
      <div>
        This is Default 2 - example 1 Page.
      </div>
      <Link href="/routeExample">
        <a>back to Page</a>
      </Link>
      {data}
    </MainHeader>
  );
};

export default Home;
