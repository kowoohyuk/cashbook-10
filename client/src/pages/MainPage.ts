import { eventHandler } from '../lib/woowact/core/EventHandler';
import { Component } from '../lib/woowact/index';
import { historyStore } from '../stores/History';
import '../styles/main/index.scss';
import HistorySection from '../components/History/HistortySection';
import ChartSection from '../components/Chart/ChartSection';
import CalendarSection from '../components/Calendar/CalendarSection';
import AddButton from '../components/Common/AddButton';

export default class MainPage extends Component {
  count = 0;
  $historySection: Component;
  $calendarSection: Component;
  $chartSection: Component;
  $addButton: Component;

  constructor() {
    super({});

    this.$historySection = this.addComponent(HistorySection);
    this.$chartSection = this.addComponent(ChartSection);
    this.$calendarSection = this.addComponent(CalendarSection);
    this.$addButton = this.addComponent(AddButton);

    this.init();
  }

  componentDidUpdate() {
    eventHandler.addEvent(this.$element, 'click', () => {
      //console.log(historyStore.data.histories.length);
    });
  }

  render(): string {
    return `
    <div class="page main-page">
      ${this.$chartSection.html}
      ${this.$calendarSection.html}
      ${this.$historySection.html}
      ${this.$addButton.html}
    </div>
    `;
  }
}
