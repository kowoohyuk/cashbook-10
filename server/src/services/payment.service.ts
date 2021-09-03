import UserPayment from '../models/userPayment';
import Payment from '../models/payment';
import { Op } from 'sequelize';
import { convertScriptText } from '../utils/convertScriptText';
import { DEFAULT_PAYMENT } from '../models/dummy';

export const insertInitPayment = async (userId: number) => {
  const payments: Payment[] = await Payment.findAll({
    where: {
      id: {
        [Op.lte]: DEFAULT_PAYMENT.length,
      },
    },
    order: [['id', 'ASC']],
  });

  const initPayments = payments.map(payment => ({
    userId: userId,
    paymentId: payment.id,
    name: payment.name,
  }));
  UserPayment.sync().then(async () => {
    UserPayment.bulkCreate(initPayments);
  });
  return true;
};

const insertOrSelectPayment = async (name: string) => {
  const executeResult: [Payment, boolean] = await Payment.findOrCreate({
    defaults: { name },
    where: { name },
    attributes: ['id', 'name'],
  });
  return executeResult;
};

export const insertUserPayment = async (userId: number, name: string) => {
  name = convertScriptText(name);
  const isExist = await checkExistUserPayment(userId, name);
  if (isExist) return null;
  const [payment] = await insertOrSelectPayment(name);
  const insertUserPaymentResult = await UserPayment.create({
    userId,
    name,
    paymentId: payment.id,
  });
  if (insertUserPaymentResult) {
    return {
      name,
      id: payment.id,
    };
  }
  return null;
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
    attributes: ['paymentId', 'name'],
    order: [['id', 'ASC']],
  });

  return userPayments;
};

export const selectPayment = async () => {
  const payments: Payment[] = await Payment.findAll({
    attributes: ['id', 'name'],
    order: [['id', 'ASC']],
  });
  return payments;
};

export const destroyPayment = async (userId: number, paymentId: number) => {
  const destroyResult = await UserPayment.destroy({
    where: { userId, paymentId },
  });
  return destroyResult;
};
