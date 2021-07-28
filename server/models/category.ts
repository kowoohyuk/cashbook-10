import { AllowNull, Column, Model, Table, Unique } from "sequelize-typescript";

export const DEFAULT_CATEGORY = [
  "생활",
  "식비",
  "교통",
  "쇼핑/뷰티",
  "의료/건강",
  "문화/여가",
  "미분류",
  "월급",
  "용돈",
  "기타수입",
];

export interface ICategory {
  id?: number;
  name: string;
}

@Table
export default class Category extends Model<ICategory> {
  @AllowNull(false)
  @Unique
  @Column
  name: string;
}
