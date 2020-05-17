import { LikeListItemProps, LikeListProps } from 'components/LikeList/LikeListItem/interface';

export interface ImageItemProps extends LikeListItemProps {
  imageSize: ImageSizeProps;
}

export interface ImageSizeProps {
  width: number;
  height: number;
}

export interface LikeGridViewProps {
  itemArray: LikeListProps[];
}
