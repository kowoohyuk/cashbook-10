import { IAPIResultData } from '.';
import User from '../models/user';
import UserPayment from '../models/userPayment';
import { selectUserPayment } from '../services/payment.service';
import { insertInitPayment } from './payment.service';

const MESSAGE = {
  GET_FAIL: '유저 로그인 실패',
  POST_FAIL: '유저 가입 실패',
  POST_EXIST: '이미 존재하는 이메일입니다.',
  POST_FAIL_VALIDATION: '유효하지 않은 이메일 입니다.',
};

const validationEmail = (email: string): boolean =>
  !/([a-zA-Z0-9\-\_])+@+([a-zA-Z])+\.+([a-zA-Z])/i.test(email);

const checkExistUser = async (email: string) => {
  const result: IAPIResultData = {};
  try {
    const data = await User.findOne({
      where: {
        email,
      },
    });
    result.error = !!data;
    return result;
  } catch (e) {
    result.error = true;
    result.message = e.message || MESSAGE.POST_FAIL;
    return result;
  }
};

export const insertUser = async (email: string, pw: string) => {
  const result: IAPIResultData = {};
  try {
    if (validationEmail(email)) {
      throw new Error(MESSAGE.POST_FAIL_VALIDATION);
    }
    const isExist = await checkExistUser(email);
    if (isExist) {
      throw new Error(MESSAGE.POST_EXIST);
    }
    const insertUserResult = await User.create({ email, pw });
    const insertInitPaymentResult = await insertInitPayment(
      insertUserResult.id,
    );
    if (insertInitPaymentResult && insertUserResult) {
      result.data = insertUserResult;
      return result;
    }
    throw new Error();
  } catch (e) {
    result.error = true;
    result.message = e.message || MESSAGE.POST_FAIL;
    return result;
  }
};

export const selectUser = async (email: string, pw: string) => {
  const user: User = await User.findOne({
    where: { email, pw },
    attributes: ['id', 'email'],
  });
  const payments: UserPayment[] = await selectUserPayment(user.id);
  return {
    id: user.id,
    email: user.email,
    payments,
  };
};
