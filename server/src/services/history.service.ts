import { Op } from 'sequelize';
import { env } from 'process';
import History, { IHistory } from '../models/history';
///// For test
const makeNewData = (needId: boolean): IHistory => {
  const contents = [
    '국밥',
    '순대',
    '치킨',
    '피자',
    '햄버거',
    '라멘',
    '돈가스',
    '떡볶이',
  ];
  if (env.MODE === 'develop') {
    return {
      id: needId ? Math.floor(Math.random() * 10) : null,
      userId: 0,
      content: contents[Math.floor(Math.random() * 10) % contents.length],
      amount: Math.floor(Math.random() * 100) * 100,
      paymentDate: new Date(),
      isIncome: false,
      paymentId: 0,
      categoryId: Math.floor(Math.random() * 10) + 1,
    };
  }
  throw new Error('데이터가 비었음!!');
};

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
  });

  const h = getIHistoryList(historyList);
  return h;
};

export const updateHistory = async (params: IHistory): Promise<boolean> => {
  if (!checkHistoryCreatable) return false;

  // TODO: 배포할 때 지울 것!!
  if (!params.content) params = makeNewData(true);

  //글쓴이가 origin history의 id와 다를 수 있으므로..! 체크해주기!
  const result = await History.update(params, {
    where: { id: params.id, userId: params.userId },
  });

  return result[0] > 0;
};

export const createHistory = async (params: IHistory): Promise<boolean> => {
  if (!checkHistoryCreatable) return false;

  // TODO: 배포할 때 지울 것!!
  if (!params.content) params = makeNewData(false);

  const result = await History.create(params);

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
