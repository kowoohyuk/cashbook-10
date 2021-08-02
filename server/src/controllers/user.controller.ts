import { signupUser, signinUser } from '../services/user.service';
import { Request, Response } from 'express';
import { HttpResponse, STATUS } from '.';

export const postSignInUser = async (req: Request, res: Response) => {
  const { email, pw } = req.body;
  const data = await signinUser(email as string, pw as string);
  HttpResponse(res, data.error ? STATUS.FAIL : STATUS.SUCCESS, data);
};

export const postSignUpUser = async (req: Request, res: Response) => {
  const { email, pw } = req.body;
  const data = await signupUser(email as string, pw as string);
  HttpResponse(res, data.error ? STATUS.FAIL : STATUS.SUCCESS, data);
};
