import { Component } from '../../lib/woowact/index';
import { historyStore } from '../../stores/History';
import Calendar, { getLastDate } from '../../utils/calendar/calendar';
import { $ } from '../../utils/selector';
import '../../styles/calendar/calendarSection';
import { IHistory } from '../../apis/historyAPI';

export default class CalendarSection extends Component {
  calendar: Calendar;

  constructor() {
    super({});
    this.calendar = new Calendar();
    historyStore.subscribe(this);
    this.init();
  }

  componentDidUpdate() {
    this.calendar.contents = this.createContents(historyStore.data.histories);
    this.calendar.target = this.$element;
    this.calendar.date = `${historyStore.data.year}-${historyStore.data.month}`;
  }

  createContents(histories: IHistory[]) {
    const contents = Array.from(
      Array(
        getLastDate(
          new Date(`${historyStore.data.year}-${historyStore.data.month}`),
        ),
      ),
      () => new Array(),
    );
    histories.forEach(({ amount, paymentDate, isIncome }) =>
      contents[new Date(paymentDate).getDate() - 1].push(
        `<div class="calendar-history ${isIncome ? 'income' : ''}">${
          (isIncome ? 1 : -1) * amount
        }</div>`,
      ),
    );
    // );
    return contents.map(content => content.join(''));
  }

  render() {
    return `
    <section class="calendar-section">
    </section>
    `;
  }
}
