import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { sequelize } from './models';
import cors from 'cors';
import APIRouter from './routers/index';
import authMiddleWare from './middlewares/auth.middleware';

declare global {
  namespace Express {
    interface Request {
      user?: TUser;
    }
  }
}

export type TUser = {
  id: number;
  email: string;
};

dotenv.config();
sequelize.sync();
const app = express();

app.set('port', process.env.PORT || 8000);

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

let corsOption = {
  origin: 'http://localhost:8080',
  credentials: true,
};

app.use(cors(corsOption));

app.use(authMiddleWare);

app.use('/api/', APIRouter);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
