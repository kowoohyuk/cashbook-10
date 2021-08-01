import { eventHandler } from '../../lib/woowact/core/EventHandler';
import { Component } from '../../lib/woowact/index';
import { historyStore, NEXT_MONTH, PREV_MONTH } from '../../stores/History';
import { $ } from '../../utils/selector';

export class DatePicker extends Component {
  constructor() {
    super({});
    historyStore.subscribe(this);
    this.init();
  }

  componentDidMount() {
    this.addEvent();
  }

  addEvent() {
    const $prevBTN = $('.date-picker__prev-btn', this.$element);
    const $nextBTN = $('.date-picker__next-btn', this.$element);

    $prevBTN &&
      eventHandler.addEvent($prevBTN, 'click', async () =>
        historyStore.dispatch(PREV_MONTH),
      );
    $nextBTN &&
      eventHandler.addEvent($nextBTN, 'click', async () =>
        historyStore.dispatch(NEXT_MONTH),
      );
  }

  render() {
    return `<div class="date-picker">
      <button class="date-picker__prev-btn"><</button>
      <div class="date-picker__date">
        <h4 class="date-picker__year">
          ${historyStore.data.year}
        </h4>
        <h2 class="date-picker__month">
          ${historyStore.data.month}
        </h2>
      </div>
      <button class="date-picker__next-btn">></button>
    </div>`;
  }
}
