import UserPayment from '../models/userPayment';
import Payment from '../models/payment';

const insertOrSelectPayment = async (name: string) => {
  const executeResult: [Payment, boolean] = await Payment.findOrCreate({
    defaults: { name },
    where: { name },
    attributes: ['id', 'name'],
  });
  return executeResult;
};

export const insertUserPayment = async (userId: number, name: string) => {
  const [payment] = await insertOrSelectPayment(name);
  const isExist = await checkExistUserPayment(userId, name);
  if (isExist) return null;
  const insertUserPaymentResult = await UserPayment.create({
    userId,
    name,
    paymentId: payment.id,
  });
  return insertUserPaymentResult;
};

const checkExistUserPayment = async (userId: number, name: string) => {
  const data = await UserPayment.findOne({
    where: {
      userId,
      name,
    },
  });
  return !!data;
};

export const selectUserPayment = async (userId: number) => {
  const userPayments: UserPayment[] = await UserPayment.findAll({
    where: { userId },
    attributes: ['id', 'name'],
  });
  return userPayments;
};

export const destroyCategory = async (userId: number, id: number) => {
  const destroyResult = await UserPayment.destroy({
    where: { userId, id },
  });
  return destroyResult;
};
