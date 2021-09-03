import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import User from './user';
import Category from './category';
import Payment from './payment';
import UserPayment from './userPayment';
import History from './history';
import {
  DEFAULT_CATEGORY,
  DEFAULT_PAYMENT,
  DEFAULT_HISTORY_LENGTH,
  getDummyHistories,
} from './dummy';

dotenv.config();
export const sequelize = new Sequelize({
  database: process.env.DATABASE,
  dialect: 'mysql',
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  models: [User, Category, Payment, UserPayment, History],
});

const init = () => {
  User.sync().then(async () => {
    const DEFAULT_USER_ID = 0;
    const user = await User.findOne({
      where: {
        id: DEFAULT_USER_ID,
      },
    });
    if (user) return;

    User.create({
      id: DEFAULT_USER_ID,
      email: 'dummy@cashbook.com',
      pw: 'dummy@cashbook.com',
    });
  });

  Category.sync().then(async () => {
    const categories = await Category.findAll();

    if (categories.length === DEFAULT_CATEGORY.length) return;
    Category.bulkCreate(DEFAULT_CATEGORY);
  });

  Payment.sync().then(async () => {
    const payments = await Payment.findAll();

    if (payments.length > DEFAULT_PAYMENT.length) return;
    Payment.bulkCreate(DEFAULT_PAYMENT);
  });

  History.sync().then(async () => {
    const histories = await History.findAll();
    if (histories.length > DEFAULT_HISTORY_LENGTH) return;
    History.bulkCreate(
      getDummyHistories(DEFAULT_CATEGORY.length, DEFAULT_PAYMENT.length),
    );
  });
};

init();
