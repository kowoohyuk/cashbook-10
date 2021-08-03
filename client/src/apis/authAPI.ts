import { GET } from './api';

export const getVerifyAuthorization = async () => {
  const result = await GET(`/auth`);
  console.log(result);
  return result;
};
