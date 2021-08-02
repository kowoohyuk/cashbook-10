import { Component } from '../../lib/woowact/index';
import { historyStore } from '../../stores/History';
import '../../styles/history/historyBrief.scss';
import { toWonForm } from '../../utils/money';
export class HistoryBrief extends Component {
  constructor() {
    super({});
    historyStore.subscribe(this);
    this.init();
  }
  render() {
    return `<div class="history-brief">
      <span class="history-count">총 ${
        historyStore.data.histories.length
      }건</span>
      <div class="history-amounts">
        <div class="history-income">수익 ${toWonForm(
          historyStore.getTotalIncome(),
        )}</div>
        <div class="history-outcome">지출 ${toWonForm(
          historyStore.getTotalOutcome(),
        )}</div>
      </div>
    </div>`;
  }
}
