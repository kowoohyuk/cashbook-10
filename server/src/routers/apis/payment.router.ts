import { Router } from 'express';
import {
  getUserPayment,
  postUserPayment,
  deleteUserPayment,
  getPaymentList,
} from '../../controllers/payment.controller';

const paymentRouter = Router();

paymentRouter.get('/all', getPaymentList);
paymentRouter.get('/', getUserPayment);
paymentRouter.post('/', postUserPayment);
paymentRouter.delete('/:id', deleteUserPayment);

export default paymentRouter;
