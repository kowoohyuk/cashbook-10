import express from 'express';
import {
  getHistoryList,
  createHistory,
  THistoryGetParams,
  updateHistory,
  removeHistory,
} from '../services/history.service';
import { STATUS, HttpResponse } from '.';
import { IHistory } from '../models/history';
import { checkValidDate } from '../../utils/date';

const MESSAGE = {
  GET_FAIL: '히스토리 조회에 싪패했습니다.',
  LOGIN_REQUIRED: '로그인이 필요한 요청입니다.',
  POST_FAIL: '히스토리 생성에 실패했습니다.',
  UPDATE_FAIL: '유저 혹은 히스토리의 정보가 잘 못 입력되었습니다.',
  INVALID_DATE: '날짜 형식이 잘못 되었습니다.',
};

export const getHistory = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    let { userId, year, month, ...query } = req.query;

    const currentUserId: number = null; // TODO: 유저 id 가지고 오기

    if (currentUserId !== null) {
      query.userId = currentUserId.toString();
    }

    if (!year || !month) throw new Error(MESSAGE.INVALID_DATE);

    const params: THistoryGetParams = {
      year: year as string,
      month: month as string,
      ...query,
    };

    const history = await getHistoryList(params);

    HttpResponse(res, STATUS.SUCCESS, { data: history });
  } catch (e) {
    console.error(e);
    HttpResponse(res, STATUS.FAIL, {
      message: e.message,
    });
  }
};

export const postHistory = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const userId: number = 0; // TODO: 유저 id 가지고 오기

    if (userId === null) throw new Error(MESSAGE.LOGIN_REQUIRED);

    const data: IHistory = {
      ...req.body,
      userId,
    }; // TODO: Need to check validation

    const result: boolean = await createHistory(data);

    if (!result) throw new Error(MESSAGE.POST_FAIL);

    HttpResponse(res, STATUS.SUCCESS, {});
  } catch (e) {
    console.error(e);
    HttpResponse(res, STATUS.FAIL, {
      message: e.message,
    });
  }
};

export const putHistory = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const userId: number = 0; // TODO: 유저 id 가지고 오기

    if (userId === null) throw new Error(MESSAGE.LOGIN_REQUIRED);

    const data: IHistory = {
      ...req.body,
      userId,
    }; // TODO: Need to check validation

    const result: boolean = await updateHistory(data);

    if (!result) throw new Error(MESSAGE.UPDATE_FAIL);

    HttpResponse(res, STATUS.SUCCESS, {});
  } catch (e) {
    console.error(e);
    HttpResponse(res, STATUS.FAIL, {
      message: e.message,
    });
  }
};

export const deleteHistory = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const userId: number = 0; // TODO: 유저 id 가지고 오기

    const result: boolean = await removeHistory(userId, 11);

    if (!result) throw new Error(MESSAGE.UPDATE_FAIL);

    HttpResponse(res, STATUS.SUCCESS, {});
  } catch (e) {
    console.error(e);
    HttpResponse(res, STATUS.FAIL, {
      message: e.message,
    });
  }
};
