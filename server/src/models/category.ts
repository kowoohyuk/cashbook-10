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
    color: '#6ed5eb',
  },
  {
    name: '식비',
    isIncome: false,
    color: '#4cb8b8',
  },
  {
    name: '교통',
    isIncome: false,
    color: '#94d3cc',
  },
  {
    name: '쇼핑/뷰티',
    isIncome: false,
    color: '#4ca1de',
  },
  {
    name: '의료/건강',
    isIncome: false,
    color: '#d092e2',
  },
  {
    name: '문화/여가',
    isIncome: false,
    color: '#817dce',
  },
  {
    name: '미분류',
    isIncome: false,
    color: '#4a6cc3',
  },
  {
    name: '월급',
    isIncome: true,
    color: '#b9d58c',
  },
  {
    name: '용돈',
    isIncome: true,
    color: '#e6d267',
  },
  {
    name: '기타수입',
    isIncome: true,
    color: '#e2b765',
  },
];

export interface ICategory {
  id?: number;
  name: string;
  isIncome: boolean;
  color: string;
}

@Table({
  timestamps: false,
})
export default class Category extends Model<ICategory> {
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isIncome: boolean;

  @AllowNull(false)
  @Column(DataType.STRING)
  color: string;

  @HasMany(() => History)
  histories: History[];
}
