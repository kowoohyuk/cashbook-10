import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { sequelize } from './models';
import APIRouter from './routers/index';

dotenv.config();
sequelize.sync();
const app = express();

app.set('port', process.env.PORT || 8000);
// app.use('/', express.static(path.join(__dirname, 'public')));

app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/', APIRouter);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
