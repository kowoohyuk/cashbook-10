import {
  Table,
  Column,
  Model,
  Unique,
  CreatedAt,
  DataType,
  HasMany,
  PrimaryKey,
  AllowNull,
} from 'sequelize-typescript';
import History from './history';
import PaymentList from './payment_list';

export interface IUser extends Document {
  id?: number;
  email: string;
  pw: string;
  createdAt: Date;
}

@Table
export default class User extends Model<IUser> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  pw: string;

  @CreatedAt
  createdAt: Date;

  @HasMany(() => History)
  histories: History[];

  @HasMany(() => PaymentList)
  paymentLists: PaymentList[];
}
