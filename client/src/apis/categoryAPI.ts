import { GET } from './api';

export type TCategoryData = {
  id: number;
  name: string;
  isIncome: boolean;
};

export const getCategoryListAPI = async (): Promise<TCategoryData[]> => {
  const result = await GET(`/category`);
  return result;
};
