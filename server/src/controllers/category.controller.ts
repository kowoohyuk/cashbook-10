import { Request, Response } from 'express';
import { httpResponse, STATUS } from '.';
import { findCategory } from '../services/category.service';

const MESSAGE = {
  GET_FAIL: '카테고리 조회 실패',
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const data = await findCategory();
    httpResponse(res, STATUS.SUCCESS, {
      data,
    });
  } catch (e) {
    httpResponse(res, STATUS.FAIL, {
      message: MESSAGE.GET_FAIL,
    });
  }
};
