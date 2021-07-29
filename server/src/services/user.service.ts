import User from '../models/user';
import UserPayment from '../models/userPayment';
import { selectUserPayment } from '../services/payment.service';
import { insertInitPayment } from './payment.service';

const validationEmail = (email: string): boolean =>
  !/([a-zA-Z0-9\-\_])+@+([a-zA-Z])+\.+([a-zA-Z])/i.test(email);

const checkExistUser = async (email: string) => {
  const data = await User.findOne({
    where: {
      email,
    },
  });
  return !!data;
};

export const insertUser = async (email: string, pw: string) => {
  if (validationEmail(email)) return null;
  const isExist = await checkExistUser(email);
  if (isExist) return null;
  const insertUserResult = await User.create({ email, pw });
  const insertInitPaymentResult = await insertInitPayment(insertUserResult.id);
  if (insertInitPaymentResult) {
    return insertUserResult;
  }
  return null;
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
