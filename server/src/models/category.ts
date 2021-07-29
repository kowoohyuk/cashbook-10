import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import History from './history';

export const DEFAULT_CATEGORY = [
  {
    name: '생활',
    isIncome: false,
  },
  {
    name: '식비',
    isIncome: false,
  },
  {
    name: '교통',
    isIncome: false,
  },
  {
    name: '쇼핑/뷰티',
    isIncome: false,
  },
  {
    name: '의료/건강',
    isIncome: false,
  },
  {
    name: '문화/여가',
    isIncome: false,
  },
  {
    name: '미분류',
    isIncome: false,
  },
  {
    name: '월급',
    isIncome: true,
  },
  {
    name: '용돈',
    isIncome: true,
  },
  {
    name: '기타수입',
    isIncome: true,
  },
];

export interface ICategory {
  id?: number;
  name: string;
  isIncome: boolean;
}

@Table
export default class Category extends Model<ICategory> {
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isIncome: boolean;

  @HasMany(() => History)
  histories: History[];
}
