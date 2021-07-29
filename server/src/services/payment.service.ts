import UserPayment from '../models/userPayment';
import Payment from '../models/payment';

const insertOrSelectPayment = async (name: string) => {
  const executeResult: [Payment, boolean] = await Payment.findOrCreate({
    where: { name },
    attributes: ['id', 'name'],
  });
  return executeResult;
};

export const insertUserPayment = async ({ userId, name }: UserPayment) => {
  const [payment, isCreated] = await insertOrSelectPayment(name);
  const insertUserPaymentResult = await UserPayment.create({
    userId,
    name,
    paymentId: payment.id,
  });
  console.log('payment 만들기');
  console.log(isCreated, insertUserPaymentResult);
};

export const selectUserPayment = async (userId: number) => {
  const userPayments: UserPayment[] = await UserPayment.findAll({
    where: { userId },
    attributes: ['id', 'name'],
  });
  return userPayments;
};

export const destroyCategory = async (id: number) => {
  const destroyResult = await UserPayment.destroy({
    where: { id },
  });
  return destroyResult;
};
