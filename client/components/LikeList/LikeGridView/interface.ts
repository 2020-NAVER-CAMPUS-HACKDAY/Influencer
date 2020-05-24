import React from 'react';
import { IntersectionObserverListProps } from 'components/Common/IntersectionObserverList';
import { ProductDataProps } from '../../../redux/ducks/Interface';

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

export interface LikeViewProps {
  handleItemClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  categoryArray: string[];
}
export interface LikeGridViewProps extends LikeViewProps {
  itemArray: LikeGridViewProductProps;
}

export interface LikeListProps extends LikeListCategoryProps, IntersectionObserverListProps {
  likeList: ProductDataProps[];
}

export interface LikeGridViewItemProps {
  productId: string;
  imageLink: string;
  category: string;
  likeDate: string;
}

export interface LikeListCategoryProps extends LikeViewProps {
  clickedCategory: string;
}

export interface LikeGridViewProductProps {
  clothLike: LikeGridViewItemProps[];
  accessaryLike: LikeGridViewItemProps[];
  beautyLike: LikeGridViewItemProps[];
  digitalLike: LikeGridViewItemProps[];
  interialLike: LikeGridViewItemProps[];
  babyLike: LikeGridViewItemProps[];
  footLike: LikeGridViewItemProps[];
  sportLike: LikeGridViewItemProps[];
  lifeLike: LikeGridViewItemProps[];
  leisureLike: LikeGridViewItemProps[];
  dutyFreeLike: LikeGridViewItemProps[];
}

export interface FetchGridViewProps {
  data: LikeGridViewProductProps;
}
