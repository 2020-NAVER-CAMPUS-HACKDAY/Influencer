import { ProductProps } from 'components/Interaction/SwiperItem/interface';
import { Category } from 'views/interactionView/interactionDummyData';

export interface CardProps {
  productId: string;
  onSwipeRight: (productId: string) => string;
  onDoubleTap: (productId: string) => string;
  onSwiped: (cardIndex: number) => void;
  cardIndex: number;
  totalCard: number;
}

export interface SwiperProps {
  products: ProductProps[];
  setPage: () => void;
  currentCategory: Category;
  page: number;
}
