import {
  signupUser,
  signinUser,
  checkExistUser,
  selectUser,
} from '../services/user.service';
import { Request, Response } from 'express';
import { httpResponse, STATUS } from '.';

export const postSignInUser = async (req: Request, res: Response) => {
  const { email, pw } = req.body;
  const data = await signinUser(email as string, pw as string);
  httpResponse(res, data.error ? STATUS.FAIL : STATUS.SUCCESS, data);
};

export const postSignUpUser = async (req: Request, res: Response) => {
  const { email, pw } = req.body;
  const data = await signupUser(email as string, pw as string);
  httpResponse(res, data.error ? STATUS.FAIL : STATUS.SUCCESS, data);
};

export const getCheckExistUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  const data = await checkExistUser(email as string);
  httpResponse(res, STATUS.SUCCESS, data);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.user.id;
  const data = await selectUser(id);
  httpResponse(res, STATUS.SUCCESS, data);
};
