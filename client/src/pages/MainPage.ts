import { eventHandler } from '../lib/woowact/core/EventHandler';
import { Component } from '../lib/woowact/index';
import { historyStore } from '../stores/History';
import '../styles/main/index.scss';
import HistorySection from '../components/History/HistortySection';

export default class MainPage extends Component {
  count = 0;
  $historySection: Component;
  constructor() {
    super({});

    historyStore.subscribe(this);
    this.$historySection = this.addComponent(HistorySection);
    this.init();
  }

  componentDidUpdate() {
    eventHandler.addEvent(this.$element, 'click', () => {
      console.log(historyStore.data.histories.length);
    });
  }

  render(): string {
    return `
    <div class="page main-page">
    <section class="chart-section">
    </section>
    <section class="calander-section">
    </section>
    ${Component._(this.$historySection)}
    </div>
    `;
  }
}
