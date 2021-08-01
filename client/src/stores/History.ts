import {
  getHistoryAPI,
  IHistory,
  removeHistoryAPI,
  THistoryGetParams,
} from '../apis/historyAPI';
import { Store } from '../lib/woowact/core/Store';

export const INIT_HISTORY = 'HISTORY/INIT' as const;
export const DELETE_HISTORY = 'HISTORY/DELETE' as const;
export const UPDATE_HISTORY = 'HISTORY/UPDATE' as const;
export const PREV_MONTH = 'HISTORY/PREV_MONTH' as const;
export const NEXT_MONTH = 'HISTORY/NEXT_MONTH' as const;

type THistoryData = {
  year: number;
  month: number;
  histories: IHistory[];
};

class HistoryStore extends Store<THistoryData> {
  constructor(historyData: THistoryData) {
    super(historyData);

    this.dispatch(INIT_HISTORY);
  }

  actions = {
    [INIT_HISTORY]: this.initHistories.bind(this),
    [UPDATE_HISTORY]: this.updateHistories.bind(this),
    [DELETE_HISTORY]: this.deleteHistory.bind(this),
    [PREV_MONTH]: this.prevMonth.bind(this),
    [NEXT_MONTH]: this.nextMonth.bind(this),
  };

  findHistoryId = (historyId?: number): boolean => {
    return (
      this._data.histories.findIndex((h: IHistory) => historyId === h.id) >= 0
    );
  };

  async deleteHistory(historyId?: number): Promise<Partial<THistoryData>> {
    try {
      if (!historyId || !this.findHistoryId(historyId)) {
        throw new Error('History id가 없습니다');
      }

      const result = await removeHistoryAPI(historyId);

      if (result) {
        const histories = this._data.histories.filter(
          (h: IHistory) => h.id !== historyId,
        );

        return { histories };
      }

      throw new Error('삭제된 데이터가 없습니다.');
    } catch (e) {
      console.error(e);
      return { histories: this._data.histories };
    }
  }

  async initHistories(): Promise<Partial<THistoryData>> {
    const today = new Date();

    const histories = await getHistoryAPI({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
    });

    return { histories };
  }

  async updateHistories(
    params: THistoryGetParams,
  ): Promise<Partial<THistoryData>> {
    const histories = await getHistoryAPI(params);

    return { histories };
  }

  async nextMonth() {
    let month = this.data.month + 1;
    let year = this.data.year;

    if (month > 12) {
      month = 1;
      year++;
    }

    const histories = await getHistoryAPI({
      year,
      month,
    });

    return { year, month, histories };
  }

  async prevMonth() {
    let month = this.data.month - 1;
    let year = this.data.year;

    if (month < 1) {
      month = 12;
      year--;
    }

    const histories = await getHistoryAPI({
      year,
      month,
    });

    return { year, month, histories };
  }

  updateStore = (action: string, newHistory: Partial<THistoryData>) => {
    if (!newHistory) return;

    switch (action) {
      case INIT_HISTORY:
        this.updateData({ ...newHistory });
        break;
      case UPDATE_HISTORY:
        this.updateData({ ...newHistory });
        break;
      case DELETE_HISTORY:
        this.updateData({ ...newHistory });
        break;
      case PREV_MONTH:
        this.updateData({ ...newHistory });
        break;
      case NEXT_MONTH:
        this.updateData({ ...newHistory });
        break;
      default:
        break;
    }
  };
}

export const historyStore: HistoryStore = new HistoryStore({
  histories: [],
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
});
