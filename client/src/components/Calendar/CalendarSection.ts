import { Component } from '../../lib/woowact/index';
import { historyStore } from '../../stores/History';
import Calendar, { getLastDate } from '../../utils/calendar/calendar';
import { $ } from '../../utils/selector';
import '../../styles/calendar/calendarSection';
import { IHistory } from '../../apis/historyAPI';
import { AddHistoryModal } from '../Modals/AddHistoryModal';
import { DailyHistoryModal } from '../Modals/DailyHistoryModal';

export default class CalendarSection extends Component {
  calendar: Calendar;

  constructor() {
    super({});
    this.calendar = new Calendar();
    historyStore.subscribe(this);
    this.init();
    this.calendar.onClickCallBack = (e: HTMLElement) => {
      if (e.dataset) {
        console.log(new Date(e.dataset.date as string));
        new DailyHistoryModal({
          date: new Date(e.dataset.date as string),
        });
      }
    };
  }

  componentDidUpdate() {
    this.calendar.contents = this.createContents(historyStore.data.histories);
    this.calendar.target = this.$element;
    this.calendar.date = `${historyStore.data.year}-${historyStore.data.month}`;
  }

  createContents(histories: IHistory[]) {
    const contents: string[] = Array(
      getLastDate(
        new Date(`${historyStore.data.year}-${historyStore.data.month}`),
      ),
    );
    const amounts: number[][] = Array.from(Array(contents.length), () => [
      0, 0,
    ]);
    histories.forEach(({ amount, paymentDate, isIncome }) => {
      const date = new Date(paymentDate).getDate() - 1;
      amounts[date][Number(isIncome)] += amount;
    });
    amounts.forEach((amount, index) => {
      const [inCome, outCome] = amount;
      const content = [];
      if (inCome) {
        content.push(
          `<div class="calendar-history income">${inCome.toLocaleString()}</div>`,
        );
      }
      if (outCome) {
        content.push(
          `<div class="calendar-history">-${outCome.toLocaleString()}</div>`,
        );
      }
      if (content.length) {
        contents[index] = content.join('');
      }
    });
    return contents;
  }

  render() {
    return `
    <section class="calendar-section">
    </section>
    `;
  }
}
