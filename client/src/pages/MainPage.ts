import { eventHandler } from '../lib/woowact/core/EventHandler';
import { Component } from '../lib/woowact/index';
import { historyStore } from '../stores/History';
import '../styles/main/index.scss';
import HistorySection from '../components/History/HistortySection';
import ChartSection from '../components/Chart/ChartSection';
import CalanderSection from '../components/Calander/CalanderSection';
import AddButton from '../components/Common/AddButton';

export default class MainPage extends Component {
  count = 0;
  $historySection: Component;
  $calanderSection: Component;
  $chartSection: Component;
  $addButton: Component;

  constructor() {
    super({});

    historyStore.subscribe(this);

    this.$historySection = this.addComponent(HistorySection);
    this.$chartSection = this.addComponent(ChartSection);
    this.$calanderSection = this.addComponent(CalanderSection);
    this.$addButton = this.addComponent(AddButton);

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
      ${Component._(this.$chartSection)}
      ${Component._(this.$calanderSection)}
      ${Component._(this.$historySection)}
      ${Component._(this.$addButton)}
    </div>
    `;
  }
}
