import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { CategoryOffers } from '../components/Offers/CategoryOffers';

export const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  if (!categoryId) {
    navigate('/');
    return null;
  }

  return (
    <Layout>
      <CategoryOffers categoryId={categoryId} />
    </Layout>
  );
};
