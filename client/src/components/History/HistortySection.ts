import { Component } from '../../lib/woowact/index';
import HistoryList from './HistoryList';
import '../../styles/history/historySection.scss';
import { historyStore, THistoryList } from '../../stores/History';
import { HistoryBrief } from './HistoryBrief';
import { emptyPNG } from '../../useResource';
import { categoryStore } from '../../stores/Category';
import { paymentStore } from '../../stores/Payment';

export default class HistorySection extends Component {
  constructor() {
    super({});

    historyStore.subscribe(this);
    categoryStore.subscribe(this);
    paymentStore.subscribe(this);

    this.init();
  }

  generateList(): string {
    const days: THistoryList[] = historyStore.getDayList();

    return days.map(hl => this.addComponent(HistoryList, hl).html).join('');
  }

  render() {
    return `
    <section class="history-section">
      ${this.addComponent(HistoryBrief, historyStore.data.histories).html}
      <div class="history-content">
      ${
        historyStore.data.histories.length > 0
          ? this.generateList()
          : `
      <div class="history-empty-notification">
        <img src="${emptyPNG}" alt="empty-list"/>
        데이터가 없습니다. 내역을 추가해주세요
      </div>
      `
      }
      </div>
    </section>
    `;
  }
}
