import { Alert, Card, Spin } from 'antd';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { fetchOffers } from '../../api/offers';
import { Offer } from '../../types';
import { OffersList } from '../Offers/OffersList';

interface Props {
  categoryId: string;
}

export const CategoryOffers = ({ categoryId }: Props) => {
  const { isLoading, error, data } = useQuery<{ data: Offer[] }, AxiosError>(
    ['category-offers', categoryId],
    () => fetchOffers({ categoryId: Number(categoryId) })
  );

  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    return <Alert type='error' message={error.message} />;
  }

  return <Card>{data?.data && <OffersList offers={data.data} />}</Card>;
};
