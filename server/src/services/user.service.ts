import { generateToken } from '../utils/jwt';
import { IAPIResultData } from '.';
import User from '../models/user';
import { insertInitPayment } from './payment.service';

const MESSAGE = {
  SIGNIN_FAIL: '유저 로그인 실패',
  SIGNUP_FAIL: '유저 가입 실패',
  DATABASE_FAIL: '서버 연결 오류', // 데이터베이스 연결 에러
  USER_EXIST: '이미 존재하는 이메일입니다.',
  SIGNUP_FAIL_VALIDATION: '유효하지 않은 이메일 입니다.',
};

const validationEmail = (email: string): boolean =>
  !/([a-zA-Z0-9\-\_])+@+([a-zA-Z])+\.+([a-zA-Z])/i.test(email);

export const checkExistUser = async (email: string) => {
  const result: IAPIResultData = {};
  try {
    const data = await User.findOne({
      where: {
        email,
      },
    });
    result.error = !!data;
    if (result.error) result.message = MESSAGE.USER_EXIST;
    result.data = !!data;
    return result;
  } catch (e) {
    result.error = true;
    result.message = MESSAGE.DATABASE_FAIL;
    return result;
  }
};

export const signupUser = async (email: string, pw: string) => {
  const result: IAPIResultData = {};
  try {
    if (validationEmail(email)) {
      throw new Error(MESSAGE.SIGNUP_FAIL_VALIDATION);
    }
    const isExist = await checkExistUser(email);
    if (isExist.error) {
      throw new Error(MESSAGE.USER_EXIST);
    }
    const insertUserResult = await User.create({ email, pw });
    const insertInitPaymentResult = await insertInitPayment(
      insertUserResult.id,
    );
    if (insertInitPaymentResult && insertUserResult) {
      const accessToken = generateToken({
        id: insertUserResult.id,
        email,
      });
      result.data = {
        token: accessToken,
        email,
      };
      return result;
    }
    throw new Error();
  } catch (e) {
    result.error = true;
    result.message = e.message || MESSAGE.DATABASE_FAIL;
    return result;
  }
};

export const signinUser = async (email: string, pw: string) => {
  const result: IAPIResultData = {};
  try {
    const user: User = await User.findOne({
      where: { email, pw },
      attributes: ['id', 'email'],
    });
    const accessToken = generateToken(user);
    result.data = {
      token: accessToken,
      email,
    };
    return result;
  } catch (e) {
    result.error = true;
    result.message = e.message || MESSAGE.SIGNUP_FAIL;
    return result;
  }
};

export const selectUser = async (id: number) => {
  const result: IAPIResultData = {};
  try {
    const data = await User.findOne({
      where: {
        id,
      },
      attributes: ['email'],
    });
    result.data = data;
    return result;
  } catch (e) {
    result.error = true;
    result.message = MESSAGE.DATABASE_FAIL;
    return result;
  }
};
