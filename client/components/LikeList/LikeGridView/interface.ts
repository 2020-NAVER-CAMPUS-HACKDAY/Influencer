import React from 'react';

export interface ImageItemProps {
  imageSize: ImageSizeProps;
  item: LikeGridViewItemProps;
}

export interface ImageSizeProps {
  width: number;
  height: number;
}

export interface LikeGridViewProps {
  itemArray: LikeGridViewItemProps[];
}

export interface LikeGridViewItemProps {
  productId: string;
  imageLink: string;
  category: string;
  likeDate: string;
}

export interface LikeListCategoryProps extends LikeGridViewProps {
  handleCategoryClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  clickedCategory: string;
}
