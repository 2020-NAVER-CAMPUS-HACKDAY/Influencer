import React, { FC } from 'react';
import useStyles from 'components/LikeList/LikeGridView/styles';
import { AppColor, GridImageSize, Category } from 'constant';
import ImageItem from 'components/LikeList/LikeGridView/ImageItem';
import Label from 'components/Common/Label';
import { LikeGridViewProps, ImageSizeProps } from 'components/LikeList/LikeGridView/interface';
import clsx from 'clsx';

const getImageDataSize = (gridViewDataArrayLength: number, index: number): ImageSizeProps => {
  if (gridViewDataArrayLength === 1) return GridImageSize.FULL_IMAGE;
  if (gridViewDataArrayLength === 2) return GridImageSize.VERTICAL_HALF_IMAGE;
  if (gridViewDataArrayLength === 3 && index === 0) return GridImageSize.HORIZONTAL_HALF_IMAGE;
  return GridImageSize.QUARTER_IMAGE;
};

const LikeGridView: FC<LikeGridViewProps> = (props) => {
  const classes = useStyles();
  const { itemArray, handleItemClick, categoryArray } = props;

  const GridViewItem = categoryArray.map((category) => (
    <li className={classes.root} id={Category[category]} key={category} onClick={handleItemClick}>
      <div className={clsx(classes.images)}>
        {itemArray[category]
          .map((item, index) => <ImageItem
            id={Category[category]}
            key={item.productId}
            item={item}
            imageSize={getImageDataSize(itemArray[category].length, index)}
          />)}
      </div>
      <Label className={clsx(classes.label, classes.marginX)}
        name={Category[category]}
        color={AppColor.BLACK}
      />
    </li>
  ));
  return (
    <ul className={classes.content}>
      {GridViewItem}
    </ul>
  );
};

export default LikeGridView;
