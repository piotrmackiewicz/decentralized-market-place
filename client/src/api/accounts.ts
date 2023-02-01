import { api } from '.';
import { Account } from '../types';

interface FetchAccountParams {
  address: string;
}

export const fetchAccount = async (params: FetchAccountParams) => {
  const response = await api.get<Account>('/account', {
    params,
  });
  return response.data;
};
