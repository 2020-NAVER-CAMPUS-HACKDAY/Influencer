import { Category } from 'interfaces/category';

interface InteractionButtonProps {
  category: Category;
  categoryIndex?: number;
  isPrev?: boolean;
  handleClick?: (categoryIndex: number) => void;
}

export default InteractionButtonProps;
