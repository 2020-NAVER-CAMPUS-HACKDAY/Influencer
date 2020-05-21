import React, { FC } from 'react';
import MainHeader from 'components/Main/MainHeader';
import { CategoryProps, categoryActions } from 'redux/ducks/category';
import { Category } from 'interfaces/category';
import CategoryRankBox from 'components/CategoryRankBox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Types } from 'redux/ducks';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from 'react-grid-dnd';
import useStyles from 'views/myCategoryRankView/styles';

interface MyCategoryRankProps extends CategoryProps {
  categoryArray: Category[];
}

const MyCategoryRankView: FC<MyCategoryRankProps> = (props) => {
  const { categoryArray } = props;
  const classes = useStyles();
  const [items, setItems] = React.useState(categoryArray);

  const onChange = (sourceId, sourceIndex, targetIndex): void => {
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
  };

  const getRankNum = (item: Category): number => items.indexOf(item) + 1;

  return (
    <MainHeader>
      <div>카테고리 랭킹 페이지</div>
      <GridContextProvider onChange={onChange}>
        <div className={classes.container}>
          <GridDropZone
            className={classes.dropZone}
            id="CategoryRank"
            boxesPerRow={3}
            rowHeight={100}
          >
            {items.map((item) => (
              <GridItem key={item.value.wholeCategoryId}>
                <CategoryRankBox category={item} rankNum={getRankNum(item)}/>
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
