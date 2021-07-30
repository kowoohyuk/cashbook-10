import { getHistoryAPI, IHistory, THistoryGetParams } from '../apis/historyAPI';
import { Store } from '../lib/woowact/core/Store';

export const INIT_HISTORY = 'HISTORY/INIT' as const;
export const UPDATE_HISTORY = 'HISTORY/UPDATE' as const;

type HistoryData = {
  histories: IHistory[];
};

class HistoryStore extends Store<HistoryData> {
  constructor(historyData: HistoryData) {
    super(historyData);
    this.dispatch(INIT_HISTORY);
  }

  actions = {
    [INIT_HISTORY]: this.initHistories,
    [UPDATE_HISTORY]: this.updateHistories,
  };

  async initHistories(): Promise<HistoryData> {
    const today = new Date();

    const histories = await getHistoryAPI({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
    });

    return { histories };
  }

  async updateHistories(params: THistoryGetParams): Promise<HistoryData> {
    const histories = await getHistoryAPI(params);

    return { histories };
  }

  updateStore = (action: string, newHistory: Partial<HistoryData>) => {
    switch (action) {
      case INIT_HISTORY:
        this.updateData(newHistory);
        break;
      case UPDATE_HISTORY:
        this.updateData(newHistory);
      default:
        break;
    }
  };
}

export const historyStore: HistoryStore = new HistoryStore({ histories: [] });
