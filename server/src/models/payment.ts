import {
  Table,
  Column,
  Model,
  Unique,
  AllowNull,
  DataType,
  HasMany,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import UserPayment from './userPayment';
import History from './history';

export interface IPayment {
  id?: number;
  name: string;
}

export const DEFAULT_PAYMENT = [
  {
    name: '현금',
  },
  {
    name: '신용카드',
  },
  {
    name: '체크카드',
  },
  {
    name: '배민페이',
  },
];

@Table({
  timestamps: false,
})
export default class Payment extends Model<IPayment> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @HasMany(() => UserPayment)
  UserPayments: UserPayment[];

  @HasMany(() => History)
  Historyies: History[];
}
