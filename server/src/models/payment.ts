import {
  Table,
  Column,
  Model,
  Unique,
  AllowNull,
  DataType,
  HasMany,
  PrimaryKey,
} from 'sequelize-typescript';
import UserPayment from './userPayment';

export interface IPayment extends Document {
  id?: number;
  name: string;
}

@Table
export default class Payment extends Model<IPayment> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @HasMany(() => UserPayment)
  UserPayments: UserPayment[];
}
