import { GET, POST } from './api';

export interface IUser {
  email: string;
  pw: string;
}

export const signupAPI = async (data: IUser) => {
  const result = await POST(`/user/signup`, data);
  return result;
};

export const signinAPI = async (data: IUser) => {
  const result = await POST(`/user/signin`, data);
  return result;
};

export const checkEmailAPI = async (email: string) => {
  const result = await GET(`/user/exist?email=${email}`);
  return result;
};
