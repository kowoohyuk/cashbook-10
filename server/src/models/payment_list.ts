import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';
import Payment from './payment';
import User from './user';

export interface IPaymentList extends Document {
  id?: number;
  userId: number;
  paymentId: number;
  name: string;
}

@Table
export default class PaymentList extends Model<IPaymentList> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  name: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Payment)
  @Column(DataType.INTEGER)
  paymentId: number;
}
