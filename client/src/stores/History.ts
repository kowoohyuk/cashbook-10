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

type THistoryData = {
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
  };

  findHistoryId = (historyId?: number): boolean => {
    return (
      this._data.histories.findIndex((h: IHistory) => historyId === h.id) >= 0
    );
  };

  async deleteHistory(historyId?: number): Promise<THistoryData> {
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

  async initHistories(): Promise<THistoryData> {
    const today = new Date();

    const histories = await getHistoryAPI({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
    });

    return { histories };
  }

  async updateHistories(params: THistoryGetParams): Promise<THistoryData> {
    const histories = await getHistoryAPI(params);

    return { histories };
  }

  updateStore = (action: string, newHistory: Partial<THistoryData>) => {
    if (!newHistory.histories) return;

    const histories = newHistory.histories;

    switch (action) {
      case INIT_HISTORY:
        this.updateData({ histories });
        break;
      case UPDATE_HISTORY:
        this.updateData({ histories });
        break;
      case DELETE_HISTORY:
        this.updateData({ histories });
        break;
      default:
        break;
    }
  };
}

export const historyStore: HistoryStore = new HistoryStore({ histories: [] });
