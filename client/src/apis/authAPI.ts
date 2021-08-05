import { GET } from './api';

export const getVerifyAuthorization = async () => {
  const result = await GET(`/auth`);
  return result;
};

export const getGithubTokenAPI = async () => {
  const url = `https://github.com/login/oauth/authorize?redirect_uri=http://localhost:8000/api/auth/github&client_id=8ec60b0200e356036306`;

  location.href = url;
};

export const tryToSignup = async () => {
  const result = await GET(`/auth/github`);

  return result;
};
