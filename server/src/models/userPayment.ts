import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
  AllowNull,
} from 'sequelize-typescript';
import Payment from './payment';
import User from './user';

export interface IUserPayment {
  id?: number;
  userId: number;
  paymentId: number;
  name: string;
}

@Table
export default class UserPayment extends Model<IUserPayment> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @AllowNull(false)
  @ForeignKey(() => Payment)
  @Column(DataType.INTEGER)
  paymentId: number;
}
