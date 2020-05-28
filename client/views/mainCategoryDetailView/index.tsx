import React, { FC } from 'react';
import MainHeader from 'components/Main/MainHeader';
import WholeCategoryName from 'components/CategoryHeader/WholeCategoryName';
import { useRouter } from 'next/router';
import { useCategoryDetail } from 'views/mainCategoryDetailView/hook';

const MainCategoryDetailView: FC = (props) => {
  const router = useRouter();
  const { categoryid } = router.query;
  console.log('ID', router.query);
  const { category, children } = useCategoryDetail(categoryid);

  return (
    <MainHeader>
      <WholeCategoryName
        names={category.value.wholeCategoryName}
        ids={category.value.wholeCategoryId}
      >
      </WholeCategoryName>
    </MainHeader>
  );
};

export default MainCategoryDetailView;
