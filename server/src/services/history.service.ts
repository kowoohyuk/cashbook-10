import { Op } from 'sequelize';
import History, { IHistory } from '../models/history';
///// For test

export type THistoryGetParams = {
  userId?: number;
  category?: string;
  isIncome?: boolean;
  year: string;
  month: string;
};

const getIHistoryList = (histories: History[]): IHistory[] => {
  return histories.map((history: any) => {
    history.dataValues.amount = parseInt(history.dataValues.amount);
    return history.dataValues;
  });
};

export const getHistoryList = async (
  params: THistoryGetParams,
): Promise<IHistory[] | Error> => {
  const { year, month, ...where } = params;

  const yearNumber = parseInt(year);
  const monthNumber = parseInt(month);

  const nextMonth = monthNumber + 1 > 12 ? 1 : monthNumber + 1;
  const nextYear = nextMonth === 1 ? yearNumber + 1 : yearNumber;

  if (isNaN(yearNumber) || isNaN(monthNumber)) throw new Error('invalid date');

  const historyList: History[] = await History.findAll({
    where: {
      ...where,
      paymentDate: {
        //TODO: 하드코딩(?) 되어있어요... new Date()가 로컬 시간을 받아와서 문제가 생기는데 해결을 해야합니다
        [Op.gte]: new Date(`${year}-${month}-01 09:00:00`),
        [Op.lt]: new Date(`${nextYear}-${nextMonth}-01 09:00:00`),
      },
    },
    order: [['paymentDate', 'ASC']],
  });

  return getIHistoryList(historyList);
};

export const updateHistory = async (params: IHistory): Promise<boolean> => {
  if (!checkHistoryCreatable) return false;

  //글쓴이가 origin history의 id와 다를 수 있으므로..! 체크해주기!
  const result = await History.update(params, {
    where: { id: params.id, userId: params.userId },
  });

  return result[0] > 0;
};

export const createHistory = async (params: IHistory): Promise<boolean> => {
  if (!checkHistoryCreatable) return false;
  const date = new Date(params.paymentDate as string);
  const result = await History.create({
    ...params,
    paymentDate: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
  });

  if (result) {
    return true;
  }

  return false;
};

const checkHistoryCreatable = (): boolean => {
  return true;
};

export const removeHistory = async (
  userId: number,
  id: number,
): Promise<boolean> => {
  const result = await History.destroy({
    where: { userId, id },
  });

  return result > 0;
};
