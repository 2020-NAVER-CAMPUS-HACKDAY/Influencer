import { Product } from 'interfaces/product';

export interface LikeList {
  clothLike: Product[];
  accessaryLike: Product[];
  beautyLike: Product[];
  digitalLike: Product[];
  interialLike: Product[];
  babyLike: Product[];
  footLike: Product[];
  sportLike: Product[];
  lifeLike: Product[];
  leisureLike: Product[];
  dutyFreeLike: Product[];
}

export interface LikeListProduct {
  data: LikeList;
}

export interface LikeListDucksProps extends LikeListProduct {
  pageId: number;
  isFetchTrue: boolean;
}
