import { insertUser, selectUser } from '../services/user.service';
import { Request, Response } from 'express';
import { HttpResponse, STATUS } from '.';
import { generateToken } from '../utils/jwt';

const MESSAGE = {
  GET_FAIL: '유저 로그인 실패',
  POST_FAIL: '유저 가입 실패',
  POST_EXIST: '이미 존재하는 이메일입니다.',
  POST_FAIL_VALIDATION: '유효하지 않은 이메일 입니다.',
};

export const postSignInUser = async (req: Request, res: Response) => {
  try {
    const { email, pw } = req.query;
    const data = await selectUser(email as string, pw as string);
    HttpResponse(res, STATUS.SUCCESS, {
      data,
    });
  } catch (e) {
    HttpResponse(res, STATUS.FAIL, {
      message: MESSAGE.GET_FAIL,
    });
  }
};

export const postSignUpUser = async (req: Request, res: Response) => {
  try {
    const { email, pw } = req.body;
    const data = await insertUser(email as string, pw as string);
    if (data.error) {
      return HttpResponse(res, STATUS.SUCCESS, {
        message: MESSAGE.POST_FAIL_VALIDATION,
      });
    }
    const accessToken = generateToken({
      email,
      pw,
    });
    HttpResponse(res, STATUS.SUCCESS, {
      data: {
        email,
        accessToken,
      },
    });
  } catch (e) {
    HttpResponse(res, STATUS.FAIL, {
      message: MESSAGE.POST_FAIL,
    });
  }
};
