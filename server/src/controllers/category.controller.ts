import { Request, Response } from 'express';
import { HttpResponse, STATUS } from '.';
import { findCategory } from '../services/category.service';

const MESSAGE = {
  GET_FAIL: '카테고리 조회 실패',
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;
    const data = await findCategory();
    HttpResponse(res, STATUS.SUCCESS, {
      data,
    });
  } catch (e) {
    HttpResponse(res, STATUS.FAIL, {
      message: MESSAGE.GET_FAIL,
    });
  }
};
