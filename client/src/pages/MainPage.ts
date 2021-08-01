import HistoryItem from '../components/History/HistoryItem';
import { eventHandler } from '../lib/woowact/core/EventHandler';
import { Component } from '../lib/woowact/index';
import { historyStore } from '../stores/History';
import { getArrayN } from '../utils/array';

export default class MainPage extends Component<{}, {}> {
  count = 0;
  constructor() {
    super({});

    historyStore.subscribe(this);

    this.init();
  }

  componentDidUpdate() {
    eventHandler.addEvent(this.$element, 'click', () => {
      console.log(historyStore.data.histories.length);
    });
  }

  generateList(): string {
    return getArrayN(historyStore.data.histories.length)
      .map(
        i =>
          `<li key = ${historyStore.data.histories[i].id}>${Component._(
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
