import React, { FC } from 'react';
import useStyles from 'components/LikeList/LikeGridView/styles';
import { AppColor, GRID_VIEW_IMAGE_DATA_SIZE, Category } from 'constant';
import ImageItem from 'components/LikeList/LikeGridView/ImageItem';
import { orderBy, uniq } from 'lodash';
import Label from 'components/Common/Label';
import { LikeGridViewProps } from 'components/LikeList/LikeGridView/interface';
import clsx from 'clsx';

const getImageDataSize = (gridViewDataArrayLength: number, index: number) => {
  if (gridViewDataArrayLength === 1) return GRID_VIEW_IMAGE_DATA_SIZE[0];
  if (gridViewDataArrayLength === 2) return GRID_VIEW_IMAGE_DATA_SIZE[1];
  if (gridViewDataArrayLength === 3 && index === 0) return GRID_VIEW_IMAGE_DATA_SIZE[2];
  return GRID_VIEW_IMAGE_DATA_SIZE[3];
};

const LikeGridView: FC<LikeGridViewProps> = (props) => {
  const classes = useStyles();
  const { itemArray } = props;

  const categoryInDataArray = uniq(itemArray.map((item) => item.category));

  const GridViewItem = categoryInDataArray.map((category) => {
    const GridViewItemData = orderBy(
      itemArray
        .filter((item) => item.category === category),
      ['likeDate'],
      ['desc'],
    );

    // TODO(daeun): add Link to go to the category
    return (
      <li className={classes.root} key={category}>
        <div className={clsx(classes.images, classes.marginLeft)}>
          {GridViewItemData
            .map((item, index) => <ImageItem
              key={item.productId}
              item={item}
              imageSize={getImageDataSize(GridViewItemData.length, index)}
            />)}
        </div>
        <Label className={clsx(classes.label, classes.marginLeft)}
          name={Category[category]}
          color={AppColor.BLACK}
        />
      </li>
    );
  });
  return (
    <ul className={classes.content}>
      {GridViewItem}
    </ul>
  );
};

export default LikeGridView;
