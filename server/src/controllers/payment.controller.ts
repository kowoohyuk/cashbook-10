import { Request, Response } from 'express';
import { HttpResponse, STATUS } from '.';
import {
  selectUserPayment,
  insertUserPayment,
  destroyPayment,
} from '../services/payment.service';

const MESSAGE = {
  GET_FAIL: '유저 결제수단 조회 실패',
  POST_FAIL: '유저 결제수단 추가 실패',
  POST_EXIST: '이미 존재하는 유저 결제수단 입니다.',
  DELETE_FAIL: '유저 결제수단 삭제 실패',
  DELETE_SUCCESS: '유저 결제수단 삭제 성공',
};

export const getUserPayment = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.query.userId as string);
    const data = await selectUserPayment(userId);
    HttpResponse(res, STATUS.SUCCESS, {
      data,
    });
  } catch (e) {
    HttpResponse(res, STATUS.FAIL, {
      message: MESSAGE.GET_FAIL,
    });
  }
};

export const postUserPayment = async (req: Request, res: Response) => {
  try {
    const { userId, name } = req.body;
    const data = await insertUserPayment(Number(userId), name);
    if (!data) {
      return HttpResponse(res, STATUS.SUCCESS, {
        message: MESSAGE.POST_EXIST,
      });
    }
    HttpResponse(res, STATUS.SUCCESS, {
      data: {
        id: data.id,
      },
    });
  } catch (e) {
    HttpResponse(res, STATUS.FAIL, {
      message: MESSAGE.POST_FAIL,
    });
  }
};

export const deleteUserPayment = async (req: Request, res: Response) => {
  try {
    const { userId, id } = req.body;
    const data = await destroyPayment(Number(userId), Number(id));
    if (!data) {
      throw new Error();
    }
    HttpResponse(res, STATUS.SUCCESS, {
      message: MESSAGE.DELETE_SUCCESS,
    });
    HttpResponse(res, STATUS.SUCCESS, {});
  } catch (e) {
    HttpResponse(res, STATUS.FAIL, {
      message: MESSAGE.DELETE_FAIL,
    });
  }
};
