import { api } from '.';
import { Offer } from '../types';

export const fetchOffersByCategoryId = async (categoryId: number) => {
  const response = await api.get<{ data: Offer[] }>('/offers', {
    params: { categoryId },
  });
  return response.data;
};

export const fetchOfferByShopIdAndOfferId = async (
  shopId: number,
  offerId: string
) => {
  const response = await api.get<Offer>('/offer', {
    params: { shopId, offerId },
  });
  return response.data;
};
