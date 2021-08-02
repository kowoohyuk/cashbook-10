import { eventHandler } from '../../lib/woowact/core/EventHandler';
import { Component } from '../../lib/woowact/index';
import { historyStore, NEXT_MONTH, PREV_MONTH } from '../../stores/History';
import { $ } from '../../utils/selector';
import IMGButton from '../Common/IMGButton';
import { leftArrowSVG, rightArrowSVG } from '../../useResource';

export class DatePicker extends Component {
  $prevBTN: Component;
  $nextBTN: Component;

  constructor() {
    super({});

    this.$prevBTN = this.addComponent(IMGButton, {
      src: leftArrowSVG,
      className: 'date-picker__prev-btn',
      onclick: async () => historyStore.dispatch(PREV_MONTH),
    });

    this.$nextBTN = this.addComponent(IMGButton, {
      src: rightArrowSVG,
      className: 'date-picker__next-btn',
      onclick: async () => historyStore.dispatch(NEXT_MONTH),
    });

    historyStore.subscribe(this);
    this.init();
  }

  render() {
    return `<div class="date-picker">
      ${Component._(this.$prevBTN)}
      <div class="date-picker__date">
        <h4 class="date-picker__year">
          ${historyStore.data.year}
        </h4>
        <h2 class="date-picker__month">
          ${historyStore.data.month}
        </h2>
      </div>
      ${Component._(this.$nextBTN)}
    </div>`;
  }
}
