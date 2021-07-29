import express from 'express';
import authRouter from './apis/authRouter';
import categoryRouter from './apis/categoryRouter';
import historyRouter from './apis/historyRouter';
import paymentRouter from './apis/paymentRouter';
import userRouter from './apis/userRouter';

const APIRouter = express();

APIRouter.use('/auth', authRouter);
APIRouter.use('/payment', paymentRouter);
APIRouter.use('/user', userRouter);
APIRouter.use('/history', historyRouter);
APIRouter.use('/category', categoryRouter);

export default APIRouter;
