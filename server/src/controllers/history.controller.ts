import { Request, Response } from 'express';
import {
  getHistoryList,
  createHistory,
  THistoryGetParams,
  updateHistory,
  removeHistory,
} from '../services/history.service';
import { STATUS, httpResponse } from '.';
import { IHistory } from '../models/history';
import { checkValidDate } from '../utils/date';

const MESSAGE = {
  GET_FAIL: '히스토리 조회에 실패했습니다.',
  LOGIN_REQUIRED: '로그인이 필요한 요청입니다.',
  POST_FAIL: '히스토리 생성에 실패했습니다.',
  UPDATE_FAIL: '유저 혹은 히스토리의 정보가 잘 못 입력되었습니다.',
  INVALID_DATE: '날짜 형식이 잘못 되었습니다.',
  HISTORY_ID_NOT_EXIST: '히스토리 아이디가 잘 못 입력되었습니다.',
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const { year, month, ...query } = req.query;

    const currentUserId: number = req?.user?.id;

    if (currentUserId) {
      query.userId = currentUserId.toString();
    }

    if (!year || !month) throw new Error(MESSAGE.INVALID_DATE);

    const params: THistoryGetParams = {
      year: year as string,
      month: month as string,
      ...query,
    };

    const history = await getHistoryList(params);

    httpResponse(res, STATUS.SUCCESS, { data: history });
  } catch (e) {
    httpResponse(res, STATUS.FAIL, {
      message: e.message,
    });
  }
};

export const postHistory = async (req: Request, res: Response) => {
  try {
    const userId: number = req.user.id;

    if (userId === null) throw new Error(MESSAGE.LOGIN_REQUIRED);

    const data: IHistory = {
      ...req.body,
      userId,
    }; // TODO: Need to check validation

    const result: boolean = await createHistory(data);

    if (!result) throw new Error(MESSAGE.POST_FAIL);

    httpResponse(res, STATUS.SUCCESS);
  } catch (e) {
    console.error(e);
    httpResponse(res, STATUS.FAIL, {
      message: e.message,
    });
  }
};

export const putHistory = async (req: Request, res: Response) => {
  try {
    const userId: number = req.user.id;

    if (userId === null) throw new Error(MESSAGE.LOGIN_REQUIRED);

    const data: IHistory = {
      ...req.body,
      userId,
    }; // TODO: Need to check validation

    const result: boolean = await updateHistory(data);

    if (!result) throw new Error(MESSAGE.UPDATE_FAIL);

    httpResponse(res, STATUS.SUCCESS);
  } catch (e) {
    console.error(e);
    httpResponse(res, STATUS.FAIL, {
      message: e.message,
    });
  }
};

export const deleteHistory = async (req: Request, res: Response) => {
  try {
    const userId: number = req.user.id;

    const historyId: number = parseInt(req.query.historyId as string);

    if (isNaN(historyId)) throw new Error(MESSAGE.HISTORY_ID_NOT_EXIST);

    const result: boolean = await removeHistory(userId, historyId);

    if (!result) throw new Error(MESSAGE.UPDATE_FAIL);

    httpResponse(res, STATUS.SUCCESS);
  } catch (e) {
    console.error(e);
    httpResponse(res, STATUS.FAIL, {
      message: e.message,
    });
  }
};
