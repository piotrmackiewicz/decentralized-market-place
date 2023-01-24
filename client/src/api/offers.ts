import { api } from '.';
import { Offer } from '../types';

interface FetchOffersParams {
  categoryId?: number;
  shopId?: number;
}

export const fetchOffers = async (params: FetchOffersParams) => {
  const requestParams: FetchOffersParams = {};
  if (params.categoryId !== undefined) {
    requestParams.categoryId = params.categoryId;
  }
  if (params.shopId !== undefined) {
    requestParams.shopId = params.shopId;
  }
  const response = await api.get<{ data: Offer[] }>('/offers', {
    params: requestParams,
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
