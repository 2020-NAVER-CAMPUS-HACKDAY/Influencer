// Category Interface는 민지님께서 작성해주신다고 하셔서, 임시 선언입니다.
interface Category{
  categoryId: string;
  categoryName: string;
}

interface InteractionButtonProps {
  category: Category;
  categoryIndex?: number;
  isPrev?: boolean;
  handleClick?: (categoryIndex: number) => void;
}

export default InteractionButtonProps;
