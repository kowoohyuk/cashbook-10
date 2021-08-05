import { Component } from '../../lib/woowact/index';
import { historyStore, THistoryList } from '../../stores/History';
import '../../styles/history/historyBrief.scss';
import { toWonForm } from '../../utils/money';

export class HistoryBrief extends Component<THistoryList> {
  constructor(props: THistoryList) {
    super(props);
    this.init();
  }

  getTotalIncome = (): number => {
    return (
      this.props?.reduce((prev, history) => {
        return history.isIncome ? prev + history.amount : prev;
      }, 0) ?? 0
    );
  };

  getTotalOutcome = (): number => {
    return (
      this.props?.reduce((prev, history) => {
        return history.isIncome ? prev : prev + history.amount;
      }, 0) ?? 0
    );
  };

  render() {
    return `<div class="history-brief">
      <span class="history-count">총 ${this.props.length}건</span>
      <div class="history-amounts">
        <div class="history-income">수익 ${toWonForm(
          this.getTotalIncome(),
        )}</div>
        <div class="history-outcome">지출 ${toWonForm(
          this.getTotalOutcome(),
        )}</div>
      </div>
    </div>`;
  }
}
