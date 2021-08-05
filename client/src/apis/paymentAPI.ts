import { paymentStore } from '../stores/Payment';
import { DELETE, GET, POST } from './api';

export type TPaymentData = {
  id: number;
  name: string;
};

export type TUserPaymentData = {
  paymentId: number;
  name: string;
};

export const getTotalPaymentListAPI = async () => {
  const result = await GET(`/payment/all`);
  return result;
};

export const getUserPaymentListAPI = async () => {
  const result = await GET(`/payment`);
  return result;
};

export const addUserPaymentAPI = async (paymentName: string) => {
  const result = await POST(`/payment`, { name: paymentName });
  return result;
};

export const deleteUserPaymentAPI = async (paymentId: number) => {
  const result = await DELETE(`/payment/${paymentId}`);
  return result;
};
