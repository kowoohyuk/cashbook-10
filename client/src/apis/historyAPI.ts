import { enCodeParameters } from '../utils/url';
import { GET, POST, PUT, DELETE } from './api';

//TODO: DTO 만들기!
export interface IHistory {
  id?: number;
  content: string;
  amount: number;
  paymentDate: Date;
  isIncome: boolean;
  userId: number;
  paymentId: number;
  categoryId: number;
}

export type THistoryGetParams = {
  category?: string;
  isIncome?: boolean;
  year: number;
  month: number;
};

export const getHistoryAPI = async (data: THistoryGetParams) => {
  const params = enCodeParameters(data);
  const result = await GET(`/history?${params}`);
  return result;
};

export const updateHistoryAPI = async (data: IHistory) => {
  const result = await PUT(`/history`, data);
  return result;
};

export const removeHistoryAPI = async (historyId: number): Promise<boolean> => {
  const result = await DELETE(`/history?historyId=${historyId}`);
  return result;
};
