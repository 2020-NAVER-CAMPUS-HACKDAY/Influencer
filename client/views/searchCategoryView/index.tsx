import React, {
  FC, useEffect, useState,
} from 'react';
import MainHeader from 'components/Main/MainHeader';
import { useRouter } from 'next/router';
import { AxiosResponse } from 'axios';
import { Category, CategoryDataProps, CategoryChildrenProps } from 'interfaces/category';
import { getCategoryInfo, getCategoryChildren } from 'network/categoryApi';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { categoryActions, CategoryProps } from 'redux/ducks/category';
import { Types } from 'redux/ducks';
import { PayloadActionCreator } from 'typesafe-actions';
import WholeName from 'components/Category/WholeName';
import ChildrenCard from 'components/Category/ChildrenCard';

interface SearchCategoryViewProps extends CategoryProps {
  categoryArray: Category[];
  setCategory: PayloadActionCreator<'category/SET_CATEGORY', Category | Category[]>;
}

const SearchCategoryView: FC<SearchCategoryViewProps> = (props) => {
  const { categoryArray, setCategory } = props;
  const router = useRouter();
  const { catId } = router.query;
  const [categoryInfo, setCategoryInfo] = useState<Category>();
  const [isLastLevel, setIsLastLevel] = useState<boolean>(false);

  useEffect(() => {
    if (catId === undefined) return;
    const fetch = async (): Promise<void> => {
      await getCategoryInfo(catId)
        .then(
          (response: AxiosResponse<CategoryDataProps>) => {
            setCategoryInfo(response.data.category);
            setIsLastLevel(response.data.category.value.lastLevel);
            return response.data.category.value.lastLevel;
          },
        ).then(async (lastLevel) => {
          if (!lastLevel) {
            await getCategoryChildren(catId)
              .then(
                (response: AxiosResponse<CategoryChildrenProps>) => {
                  setCategory(response.data.categories);
                },
              );
          }
        });
    };
    fetch();
  }, [catId, setCategory]);

  return (
    <MainHeader>
      {
        categoryInfo
        && <WholeName
          ids={categoryInfo.value.wholeCategoryId}
          names={categoryInfo.value.wholeCategoryName}
        >
        </WholeName>
      }
      <ChildrenCard
        childrenData={categoryArray}
        isLastLevel={isLastLevel}
        catId={catId}
      >
      </ChildrenCard>
    </MainHeader>
  );
};

export default connect<CategoryProps, void>(
  (state: Types) => ({
    categoryArray: state.categoryReducer.categoryArray,
  }),
  (dispatch) => ({
    setCategory: bindActionCreators(categoryActions.setCategory, dispatch),
  }),
)(SearchCategoryView);
