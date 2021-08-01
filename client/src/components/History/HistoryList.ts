import { Component } from '../../lib/woowact/index';
import { historyStore } from '../../stores/History';
import { getArrayN } from '../../utils/array';
import HistoryItem from './HistoryItem';

export default class HistoryList extends Component {
  constructor() {
    super({});

    historyStore.subscribe(this);

    this.init();
  }

  generateList(): string {
    console.log(historyStore.data.histories);
    return getArrayN(historyStore.data.histories.length)
      .map(
        i =>
          `<li key = ${historyStore.data.histories[i].id}>
          ${Component._(
            this.addComponent(HistoryItem, {
              history: historyStore.data.histories[i],
            }),
          )}</li>`,
      )
      .join('');
  }

  render(): string {
    return `
    <ul>
      ${this.generateList()}
    </li>
    `;
  }
}
