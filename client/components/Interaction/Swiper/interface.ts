import { ProductProps } from 'components/Interaction/SwiperItem/interface';

export interface CardProps {
  productId: string;
  onSwipeRight: (productId: string) => string;
  onDoubleTap: (productId: string) => string;
  cardIndex: number;
  totalCard: number;
}

export interface SwiperProps {
  products: ProductProps[];
}
