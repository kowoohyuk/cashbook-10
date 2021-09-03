import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import User from './user';
import Category from './category';
import Payment from './payment';
import UserPayment from './userPayment';
import History from './history';
import { DEFAULT_CATEGORY, DEFAULT_PAYMENT } from './dummy';

dotenv.config();
export const sequelize = new Sequelize({
  database: process.env.DATABASE,
  dialect: 'mysql',
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  models: [User, Category, Payment, UserPayment, History],
});

const init = () => {
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
};

init();
