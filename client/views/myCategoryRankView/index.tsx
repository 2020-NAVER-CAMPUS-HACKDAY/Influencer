import React, { FC } from 'react';
import MainHeader from 'components/Main/MainHeader';
import { CategoryProps, categoryActions } from 'redux/ducks/category';
import { Category } from 'components/SelectCategory/types';
import CategoryRankBox from 'components/CategoryRankBox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Types } from 'redux/ducks';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move,
} from 'react-grid-dnd';
import useStyles from 'views/myCategoryRankView/styles';

interface MyCategoryRankProps extends CategoryProps {
  categoryArray: Category[];
}

const MyCategoryRankView: FC<MyCategoryRankProps> = (props) => {
  const { categoryArray } = props;
  const classes = useStyles();
  const [items, setItems] = React.useState([
    { id: 1, name: 'ben' },
    { id: 2, name: 'joe' },
    { id: 3, name: 'jason' },
    { id: 4, name: 'chris' },
    { id: 5, name: 'heather' },
    { id: 6, name: 'Richard' },
  ]);

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
  }


  return (
    <MainHeader>
      <div>카테고리 랭킹 페이지</div>
      {categoryArray && categoryArray.map((category) => (
        <CategoryRankBox key={category.value.wholeCategoryId} {...{ category }} />
      ))}
      <GridContextProvider onChange={onChange}>
        <div className={classes.container}>
          <GridDropZone
            className={classes.dropZone}
            id="left"
            boxesPerRow={3}
            rowHeight={70}
          >
            {items.map((item) => (
              <GridItem key={item.name}>
                <div className={classes.gridItem}>
                  <div className={classes.gridItemContent}>
                    {item.name[0].toUpperCase()}
                  </div>
                </div>
              </GridItem>
            ))}
          </GridDropZone>
        </div>
      </GridContextProvider>
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
)(MyCategoryRankView);
