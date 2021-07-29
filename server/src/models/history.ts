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
import Category from './category';
import User from './user';

export interface IHistory extends Document {
  id?: number;
  content: string;
  amount: number;
  paymentDate: Date;
  isIncome: boolean;
  isDeleted: boolean;
  paymentId: number;
  categoryId: number;
}

@Table
export default class History extends Model<IHistory> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  content: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL)
  amount: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  paymentDate: Date;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isIncome: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isDeleted: boolean;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @AllowNull(false)
  @ForeignKey(() => Payment)
  @Column(DataType.INTEGER)
  paymentId: number;

  @AllowNull(false)
  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  categoryId: number;
}
