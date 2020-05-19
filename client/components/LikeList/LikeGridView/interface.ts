import React from 'react';

export interface ImageItemProps {
  imageSize: ImageSizeProps;
  item: LikeGridViewItemProps;
  id: string;
}

export interface GridViewImageSize {
  FULL_IMAGE: ImageSizeProps;
  HORIZONTAL_HALF_IMAGE: ImageSizeProps;
  VERTICAL_HALF_IMAGE: ImageSizeProps;
  QUARTER_IMAGE: ImageSizeProps;
}

export interface ImageSizeProps {
  width: number;
  height: number;
}

export interface LikeGridViewProps {
  itemArray: LikeGridViewItemProps[];
  handleItemClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  categoryArray: string[];
}

export interface LikeGridViewItemProps {
  productId: string;
  imageLink: string;
  category: string;
  likeDate: string;
}

export interface LikeListCategoryProps extends LikeGridViewProps {
  clickedCategory: string;
}
