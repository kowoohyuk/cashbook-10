import express, { Router } from 'express';
import {
  deleteHistory,
  putHistory,
  postHistory,
  getHistory,
} from '../../controllers/history.controller';

const historyRouter = Router();

historyRouter.get('/', getHistory);
historyRouter.post('/', postHistory);
historyRouter.put('/', putHistory);
historyRouter.delete('/', deleteHistory);

export default historyRouter;
