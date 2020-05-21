import { ProductProps } from 'components/Interaction/SwiperItem/interface';

export interface CardProps {
  productId: number;
  onSwipeRight: (productId: number) => number;
  onDoubleTap: (productId: number) => number;
}

export interface SwiperProps {
  products: ProductProps[];
}
