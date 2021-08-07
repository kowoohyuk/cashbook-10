import { Request, Response } from 'express';
import { httpResponse, STATUS } from '.';

import {
  getGithubUserInfo,
  getJsonWebToken,
  getTokenFromGithubOAuth,
} from '../services/auth.service';

const ERROR_MSG = {
  FAIL_GET_ACCESS_TOKEN: '엑세스 토큰을 얻는데 실패하였습니다',
};

export async function githubLogin(req: Request, res: Response) {
  const url = `https://github.com/login/oauth/authorize?redirect_uri=${process.env.GITHUB_REDIRECT_URI}&client_id=${process.env.GITHUB_CLIENT_ID}`;

  res.redirect(url);
}
export async function githubAuth(req: Request, res: Response) {
  try {
    const accessToken = await getTokenFromGithubOAuth(req);

    if (!accessToken) throw new Error(ERROR_MSG.FAIL_GET_ACCESS_TOKEN);

    const { id, node_id } = await getGithubUserInfo(accessToken);

    if (!id || !node_id) throw new Error();

    const token = await getJsonWebToken(id, node_id);

    res.redirect(`${process.env.CLIENT_CALLBACK_URL}?token=${token}`);
  } catch (e) {
    httpResponse(res, STATUS.FAIL_ALERT, {
      message: e.message,
    });
  }
}
