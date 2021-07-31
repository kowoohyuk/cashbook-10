import HistoryItem from '../components/History/HistoryItem';
import { Component } from '../lib/woowact/index';
import { historyStore } from '../stores/History';
import { getArrayN } from '../utils/array';

export default class MainPage extends Component<{}, {}> {
  constructor() {
    super({});

    historyStore.subscribe(this);

    this.init();
  }

  generateList(): string {
    return getArrayN(historyStore.data.histories.length)
      .map(
        i =>
          `<li key = ${i}>${Component._(
            this.addComponent(HistoryItem, {
              history: historyStore.data.histories[i],
            }),
          )}</li>`,
      )
      .join('');
  }

  render(): string {
    return `
    <div>
      <ul>
        ${this.generateList()}
      </ul>
    </div>
    `;
  }
}
