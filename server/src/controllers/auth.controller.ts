import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

export async function githubLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const code = req.query.code;

  const url = `https://github.com/login/oauth/access_token`;

  const data = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  };

  const response = await axios(url, { data });

  const accessToken = response.data.split('&')[0].split('=')[1];
  console.log(accessToken);

  // 깃헙 > id > DB > JWT
  // 로그인 했다 > JWT
}
