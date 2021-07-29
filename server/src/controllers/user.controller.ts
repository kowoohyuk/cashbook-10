import { insertUser, selectUser } from '../services/user.service';
import express from 'express';
import { HttpResponse, STATUS } from '.';

const MESSAGE = {
  GET_FAIL: '유저 로그인 실패',
  POST_FAIL: '유저 가입 실패',
};

export const getUser = async (req: express.Request, res: express.Response) => {
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

export const postUser = async (req: express.Request, res: express.Response) => {
  try {
    const { email, pw } = req.body;
    const data = await insertUser(email as string, pw as string);
    HttpResponse(res, STATUS.SUCCESS, {
      data,
    });
  } catch (e) {
    HttpResponse(res, STATUS.FAIL, {
      message: MESSAGE.POST_FAIL,
    });
  }
};
