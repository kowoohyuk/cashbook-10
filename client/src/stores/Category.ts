import { getCategoryListAPI, TCategoryData } from '../apis/categoryAPI';
import { Store } from '../lib/woowact/core/Store';

export const INIT_CATEGORIES = 'CATEGORY/INIT' as const;

type TCategoryStoreData = {
  categories: TCategoryData[];
};

const EMPTY_DATA: TCategoryData = {
  id: 0,
  name: '',
  isIncome: false,
};

class CategoryStore extends Store<TCategoryStoreData> {
  constructor(categoryData: TCategoryStoreData) {
    super(categoryData);

    this.dispatch(INIT_CATEGORIES);
  }

  actions = {
    [INIT_CATEGORIES]: this.initCategories.bind(this),
  };

  async initCategories(): Promise<Partial<TCategoryStoreData>> {
    const categories: TCategoryData[] = await getCategoryListAPI();

    return { categories };
  }

  getData(id: number): TCategoryData {
    const index = this.data.categories.findIndex(c => c.id === id);
    return index >= 0 ? this.data.categories[index] : EMPTY_DATA;
  }

  getName(id: number): string {
    return this.getData(id).name;
  }

  updateStore = (
    action: string,
    newCategories: Partial<TCategoryStoreData>,
  ) => {
    if (!newCategories) return;

    switch (action) {
      case INIT_CATEGORIES:
        this.updateData({ ...newCategories });
        break;
      default:
        break;
    }
  };
}

export const categoryStore: CategoryStore = new CategoryStore({
  categories: [],
});
