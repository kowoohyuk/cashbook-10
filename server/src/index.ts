import express, { Request } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { sequelize } from './models';
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

app.all('/*', function (req: Request, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use(authMiddleWare);

app.use('/api/', APIRouter);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
