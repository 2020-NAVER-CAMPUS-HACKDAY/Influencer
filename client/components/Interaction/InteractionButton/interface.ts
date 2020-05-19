import { Category } from 'views/interactionView/interactionDummyData';

interface InteractionButtonProps {
  category: Category;
  categoryIndex?: number;
  isPrev?: boolean;
  handleClick?: (categoryIndex: number) => void;
}

export default InteractionButtonProps;
