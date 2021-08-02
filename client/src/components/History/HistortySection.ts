import { Component } from '../../lib/woowact/index';
import HistoryList from './HistoryList';
import '../../styles/history/historySection.scss';
import { historyStore, THistoryList } from '../../stores/History';
import { HistoryBrief } from './HistoryBrief';
import { emptyPNG } from '../../useResource';

export default class HistorySection extends Component {
  $historyBrief: Component;
  constructor() {
    super({});

    historyStore.subscribe(this);
    this.$historyBrief = this.addComponent(HistoryBrief);

    this.init();
  }

  generateList(): string {
    const days: THistoryList[] = historyStore.getDayList();

    return days
      .map(hl => Component._(this.addComponent(HistoryList, hl)))
      .join('');
  }

  render() {
    return `
    <section class="history-section">
      ${Component._(this.$historyBrief)}
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
