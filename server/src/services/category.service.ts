import Category from '../models/category';

export const selectCategory = async (name: string) => {
  const categories: Category[] = await Category.findAll({
    where: { name },
    attributes: ['id', 'name'],
  });
  return categories;
};

export const findCategory = async () => {
  const categories: Category[] = await Category.findAll({
    attributes: ['id', 'name'],
  });
  return categories;
};
