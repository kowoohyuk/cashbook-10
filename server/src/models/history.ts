import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
} from 'sequelize-typescript';
import Payment from './payment';
import Category from './category';
import User from './user';

export interface IHistory {
  id?: number;
  content: string;
  amount: number;
  paymentDate: String;
  isIncome: boolean;
  userId: number;
  paymentId: number;
  categoryId: number;
}

@Table({
  timestamps: false,
})
export default class History extends Model<IHistory> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  content: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL)
  amount: number;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  paymentDate: String;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isIncome: boolean;

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
