import { Alert, Spin } from 'antd';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchOffers } from '../../../api/offers';
import { Offer } from '../../../types';
import { OffersList } from '../../Offers/OffersList';

export const ShopOffers = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const { isLoading, error, data } = useQuery<{ data: Offer[] }, AxiosError>(
    ['shop-offers', shopId],
    () => fetchOffers({ shopId: Number(shopId) })
  );

  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    return <Alert type='error' message={error.message} />;
  }

  if (data?.data) {
    return <OffersList offers={data.data} />;
  }

  return null;
};
