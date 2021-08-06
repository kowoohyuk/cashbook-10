import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { checkExistUser, signupUser } from '../services/user.service';
import { httpResponse, STATUS } from '.';
import User from '../models/user';
import { generateToken } from '../utils/jwt';
import { IAPIResultData } from '../services';
import { insertInitPayment } from '../services/payment.service';

export async function githubLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const code = req.query.code;

    const url = `https://github.com/login/oauth/access_token`;

    const data = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    };

    const response = await axios(url, { data });

    const accessToken = response.data.split('&')[0].split('=')[1];

    const userInfo: any = await axios('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const { id: email, node_id: pw } = userInfo.data;

    //유저 있는지 체크
    const isExist = await checkExistUser(email);
    if (!isExist.data) {
      const insertUserResult = await User.create({ email, pw });
      const insertInitPaymentResult = await insertInitPayment(
        insertUserResult.id,
      );

      const accessToken = generateToken({
        id: insertUserResult.id,
        email,
      });

      res.redirect(`http://localhost:8080?token=${accessToken}`);
    } else {
      const accessToken = generateToken({
        id: isExist.data.id,
        email,
      });
      res.redirect(`http://localhost:8080?token=${accessToken}`);
    }
  } catch (e) {
    console.error(e);
  }
}
