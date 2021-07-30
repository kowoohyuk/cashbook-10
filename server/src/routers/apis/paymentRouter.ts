import { Router } from 'express';
import {
  getUserPayment,
  postUserPayment,
  deleteUserPayment,
} from '../../controllers/payment.controller';

const paymentRouter = Router();

paymentRouter.get('/', getUserPayment);
paymentRouter.post('/', postUserPayment);
paymentRouter.delete('/', deleteUserPayment);

export default paymentRouter;
