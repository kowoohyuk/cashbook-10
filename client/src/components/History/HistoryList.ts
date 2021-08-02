import { IHistory } from '../../apis/historyAPI';
import { Component } from '../../lib/woowact/index';
import { THistoryList } from '../../stores/History';
import HistoryItem from './HistoryItem';

export default class HistoryList extends Component<THistoryList> {
  date: string;
  constructor(historyList: THistoryList) {
    super(historyList);
    this.date = this.getDateString();
    this.init();
  }

  getDateString(): string {
    const date = this.props[0]?.paymentDate.toString();
    return `${date.slice(5, 7)}. ${date.slice(8, 10)}`;
  }

  generateList(): string {
    if (this.props.length === 0) return '';

    return this.props
      .map(
        (history: IHistory) =>
          `<li key = ${history.id}>
          ${this.addComponent(HistoryItem, { history }).html}
        </li>`,
      )
      .join('');
  }

  render(): string {
    return `
      <div class="history-list">
        <span class="history-list__date">${this.date}</span>
        <ul>
          ${this.generateList()}
        </ul>
      </div>
    `;
  }
}
