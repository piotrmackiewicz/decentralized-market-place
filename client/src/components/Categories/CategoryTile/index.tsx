import { Routes } from 'components/Router/routes';
import { Link } from 'react-router-dom';
import { Category } from '../../../types';
import { CategoryButton } from '../Categories.styled';

interface Props {
  category: Category;
}

export const CategoryTile = ({ category }: Props) => (
  <Link to={Routes.Category.replace(':categoryId', category.id)}>
    <CategoryButton>{category.name}</CategoryButton>
  </Link>
);
