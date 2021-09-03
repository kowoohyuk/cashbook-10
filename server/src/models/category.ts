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
