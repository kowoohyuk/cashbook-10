import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import User from './user';
import Category, { DEFAULT_CATEGORY } from './category';
import Payment from './payment';
import PaymentList from './payment_list';
import History from './history';

dotenv.config();
export const sequelize = new Sequelize({
  database: process.env.DATABASE,
  dialect: 'mysql',
  username: process.env.USER,
  password: process.env.PASSWORD,
  models: [User, Category, Payment, PaymentList, History],
});

const init = () => {
  Category.sync().then(async () => {
    const categories = await Category.findAll();

    if (categories.length === DEFAULT_CATEGORY.length) return;
    Category.bulkCreate(DEFAULT_CATEGORY);
  });
};

init();
