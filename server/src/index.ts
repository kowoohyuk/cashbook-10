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
app.use(express.urlencoded({ extended: true }));
app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});
app.use('/api/', APIRouter);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
