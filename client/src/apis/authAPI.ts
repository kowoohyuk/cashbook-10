import { GET } from './api';

export const getVerifyAuthorization = async () => {
  const result = await GET(`/auth`);
  return result;
};
