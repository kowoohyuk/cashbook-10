import express from 'express';
import { HttpResponse, STATUS } from '.';
import {
  selectUserPayment,
  insertUserPayment,
  destroyCategory,
} from '../services/payment.service';

const MESSAGE = {
  GET_FAIL: '유저 결제수단 조회 실패',
  POST_FAIL: '유저 결제수단 추가 실패',
  DELETE_FAIL: '유저 결제수단 삭제 실패',
};

export const getUserPayment = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const id = Number(req.query.id as string);
    const data = await selectUserPayment(id);
    HttpResponse(res, STATUS.SUCCESS, {
      data,
    });
  } catch (e) {
    HttpResponse(res, STATUS.FAIL, {
      message: MESSAGE.GET_FAIL,
    });
  }
};

export const postUserPayment = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { userId, name } = req.body;
    const data = await insertUserPayment(Number(userId), name);
    HttpResponse(res, STATUS.SUCCESS, {});
  } catch (e) {
    HttpResponse(res, STATUS.FAIL, {
      message: MESSAGE.GET_FAIL,
    });
  }
};

export const deleteUserPayment = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.body;
    const data = await destroyCategory(Number(id));
    console.log('삭제 결과', data);
    HttpResponse(res, STATUS.SUCCESS, {});
  } catch (e) {
    HttpResponse(res, STATUS.FAIL, {
      message: MESSAGE.GET_FAIL,
    });
  }
};
