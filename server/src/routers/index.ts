import express from 'express';
import categoryRouter from './apis/category.router';
import historyRouter from './apis/history.router';
import paymentRouter from './apis/payment.router';
import userRouter from './apis/user.router';

const APIRouter = express();

APIRouter.use('/payment', paymentRouter);
APIRouter.use('/user', userRouter);
APIRouter.use('/history', historyRouter);
APIRouter.use('/category', categoryRouter);

export default APIRouter;
