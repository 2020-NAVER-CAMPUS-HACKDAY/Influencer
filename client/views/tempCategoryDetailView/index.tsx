import React, { FC } from 'react';
import MainHeader from 'components/Main/MainHeader';
import { useRouter } from 'next/router';

const MainCategoryView: FC = () => {
  const router = useRouter();
  const { CategoryID } = router.query;

  return (
    <MainHeader>
      <div>카테고리 상세 페이지</div>
      <div>{CategoryID}</div>
    </MainHeader>
  );
};

export default MainCategoryView;
