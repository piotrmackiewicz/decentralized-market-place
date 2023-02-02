import { api } from '.';
import { Shop } from '../types';

interface FetchShopsParams {
  owner?: string;
}

export const fetchShops = async (params: FetchShopsParams) => {
  const requestParams: FetchShopsParams = {};

  if (params.owner !== undefined) {
    requestParams.owner = params.owner;
  }
  const response = await api.get<{ data: Shop[] }>('/shops', {
    params: requestParams,
  });
  return response.data;
};
