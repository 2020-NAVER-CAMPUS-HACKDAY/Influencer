import { Dispatch, SetStateAction } from 'react';
import { ProductProps } from 'components/Interaction/SwiperItem/interface';

export interface CardProps {
  productId: string;
  onSwipeRight: (productId: string) => Promise<void>;
  onDoubleTap: (productId: string) => string;
  onSwiped: (cardIndex: number) => void;
  cardIndex: number;
  totalCard: number;
}

export interface SwiperProps {
  products: ProductProps[];
  setPage: () => void;
  page: number;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
