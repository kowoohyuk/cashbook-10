import { CONFIG } from '../config';
import { GET } from './api';

export const getVerifyAuthorization = async () => {
  const result = await GET(`/auth`);
  return result;
};

export const getGithubTokenAPI = async () => {
  window.location.href = `${CONFIG.END_POINT}/auth/login`;
};
