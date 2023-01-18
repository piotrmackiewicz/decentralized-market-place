import { api } from '.';
import { Category } from '../types';

export const fetchCategories = async () => {
  const response = await api.get<{ data: Category[] }>('/categories');
  return response.data;
};
