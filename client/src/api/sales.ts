import { api } from '.';
import { Sale } from '../types';

interface FetchSalesParams {
  buyer?: string;
}

export const fetchSales = async (params: FetchSalesParams) => {
  const requestParams: FetchSalesParams = {};

  if (params.buyer !== undefined) {
    requestParams.buyer = params.buyer;
  }
  const response = await api.get<{ data: Sale[] }>('/sales', {
    params: requestParams,
  });
  return response.data;
};
