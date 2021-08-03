import { Component } from '../../lib/woowact/index';
import { historyStore } from '../../stores/History';
import Calendar from '../../utils/calendar/calendar';
import { $ } from '../../utils/selector';
import '../../styles/calendar/calendarSection';

export default class CalendarSection extends Component {
  // $calendar: Component;
  calender: Calendar;

  constructor() {
    super({});
    this.calender = new Calendar();
    historyStore.subscribe(this);
    this.init();
  }

  componentDidUpdate() {
    this.calender.target = this.$element;
    this.calender.setDate(
      `${historyStore.data.year}-${historyStore.data.month}`,
    );
  }

  render() {
    return `
    <section class="calendar-section">
    </section>
    `;
  }
}
