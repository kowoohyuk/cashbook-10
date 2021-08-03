import { Request, Response } from 'express';
import { httpResponse, STATUS } from '.';
import {
  selectUserPayment,
  selectPayment,
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
    const id = Number(req?.user?.id);
    const data = id ? await selectUserPayment(id) : await selectPayment();
    httpResponse(res, STATUS.SUCCESS, {
      data,
    });
  } catch (e) {
    httpResponse(res, STATUS.FAIL, {
      message: MESSAGE.GET_FAIL,
    });
  }
};

export const getPaymentList = async (req: Request, res: Response) => {
  try {
    const data = await selectPayment();

    httpResponse(res, STATUS.SUCCESS, {
      data,
    });
  } catch (e) {
    httpResponse(res, STATUS.FAIL, {
      message: MESSAGE.GET_FAIL,
    });
  }
};

export const postUserPayment = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const data = await insertUserPayment(Number(req.user.id), name);
    if (!data) {
      return httpResponse(res, STATUS.SUCCESS, {
        message: MESSAGE.POST_EXIST,
      });
    }
    httpResponse(res, STATUS.SUCCESS, {
      data,
    });
  } catch (e) {
    httpResponse(res, STATUS.FAIL, {
      message: MESSAGE.POST_FAIL,
    });
  }
};

export const deleteUserPayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await destroyPayment(Number(req.user.id), Number(id));
    if (!data) {
      throw new Error();
    }
    httpResponse(res, STATUS.SUCCESS, {
      message: MESSAGE.DELETE_SUCCESS,
    });
  } catch (e) {
    httpResponse(res, STATUS.FAIL, {
      message: MESSAGE.DELETE_FAIL,
    });
  }
};
