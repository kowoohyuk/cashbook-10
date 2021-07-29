import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';
import Payment from './payment';
import Category from './category';
import User from './user';

export interface IHistory extends Document {
  id?: number;
  content: string;
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

  @Column(DataType.STRING)
  content: string;

  @Column(DataType.DATE)
  paymentDate: Date;

  @Column(DataType.BOOLEAN)
  isIncome: boolean;

  @Column(DataType.BOOLEAN)
  isDeleted: boolean;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Payment)
  @Column(DataType.INTEGER)
  paymentId: number;

  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  categoryId: number;
}
