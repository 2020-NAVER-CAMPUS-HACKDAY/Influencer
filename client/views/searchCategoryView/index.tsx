import React, { FC } from 'react';
import MainHeader from 'components/Main/MainHeader';
import { useRouter } from 'next/router';

const Home: FC = (props) => {
  const router = useRouter();
  const { catId } = router.query;

  return (
    <MainHeader>
      <div>
        This is serachCategoryView Page
      </div>
      {catId}
    </MainHeader>
  );
};

export default Home;
