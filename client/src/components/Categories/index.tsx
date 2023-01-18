import { Alert, Card, Spin } from 'antd';
import { useQuery } from 'react-query';
import { Category } from '../../types';
import { AxiosError } from 'axios';
import { fetchCategories } from '../../api/categories';
import { Wrapper } from './Categories.styled';
import { CategoryTile } from './CategoryTile';

export const Categories = () => {
  const { isLoading, error, data } = useQuery<{ data: Category[] }, AxiosError>(
    'categories',
    fetchCategories
  );

  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    return <Alert type='error' message={error.message} />;
  }

  return (
    <Card>
      <Wrapper>
        {data?.data.map((category) => (
          <CategoryTile category={category} key={category.id} />
        ))}
      </Wrapper>
    </Card>
  );
};
