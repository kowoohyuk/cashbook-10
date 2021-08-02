import { Component } from '../../lib/woowact/index';
import { historyStore } from '../../stores/History';
import Calendar from '../../utils/calendar';
import { $ } from '../../utils/selector';

export default class CalendarSection extends Component {
  // $calendar: Component;
  calender: Calendar;

  constructor() {
    super({});
    this.calender = new Calendar();
    historyStore.subscribe(this);
    this.init();
  }

  componentDidMount() {}

  componentDidUpdate() {
    // // this.calander.setYear();
    // this.calander.setMonth();
    // const contents = new Array(31).fill([{obj... ,obj..., ..., n}]);
    // const contents = [
    //   '<div class="abc">abc</div>'
    // ] //
    // data-idx="0";
    //cur year, month
    // [0, 1, 2, 3, 4, 5 , 6]
    // [7, 8, 9, 10, 11, 12, 13] ...
    // return Number(e.dataset.idx) + 1
    // $.('.abc')
    //  contents, i => document.createElement().className = i
  }

  render() {
    return `
    <section class="Calendar-section">
    </section>
    `;
  }
}
