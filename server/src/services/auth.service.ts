import axios from 'axios';
import User from '../models/user';
import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt';
import { insertInitPayment } from './payment.service';
import { checkExistUser, signinUser } from './user.service';
import { getCheckExistUser } from '../controllers/user.controller';

export const getTokenFromGithubOAuth = async (req: Request) => {
  const code = req.query.code;

  const url = `https://github.com/login/oauth/access_token`;

  const data = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  };

  const response = await axios(url, { data });

  return getAccessToken(response.data);
};

const getAccessToken = (data: string) => {
  return data.split('&')[0].split('=')[1];
};

export const getGithubUserInfo = async (accessToken: string) => {
  const response = await axios('https://api.github.com/user', {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  return response.data;
};

export const getJsonWebToken = async (githubID: string, node_id: string) => {
  const id = await getUserId(githubID, node_id);

  if (id) {
    return generateToken({ id, email: githubID });
  } else {
    const token = await signinUser(githubID, node_id);
    return token.data.token;
  }
};

export const getUserId = async (id: string, node_id: string) => {
  const isExist = await checkExistUser(id);

  if (!isExist.data) {
    return createNewGithubUser(id, node_id);
  } else {
    return null;
  }
};

export const createNewGithubUser = async (email: string, pw: string) => {
  const insertUserResult = await User.create({ email, pw });
  const paymentResult = await insertInitPayment(insertUserResult.id);
  return paymentResult ? insertUserResult.id : null;
};
