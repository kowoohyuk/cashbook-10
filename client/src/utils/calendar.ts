interface ICalendarOptions {
  startWeek?: number;
  onClick?: MouseEvent;
}

type TDateObject = {
  year: number;
  month: number;
};

const convertDateToString = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const getStartWeek = (date: Date, copyDate = new Date(date)) =>
  copyDate.setDate(1) && copyDate.getDay();

const getLastDate = (date: Date, copyDate = new Date(date)) =>
  copyDate.setDate(0) && copyDate.getDate();

const WEEK_TEXTS = ['일', '월', '화', '수', '목', '금', '토', '일'];

const ERROR = {
  target:
    'target 엘리먼트가 지정되어 있지않거나 HTMLElement가 아닙니다.\r\nsetTarget으로 렌더링이 될 target 엘리먼트를 지정해주세요.',
};

export default class Calendar {
  private _date: Date;
  private _$target: HTMLElement | null;
  private _options: ICalendarOptions;
  private _selected: Date | null;
  private _dateObject: TDateObject;

  constructor(
    target = null,
    date: Date = new Date(),
    options = {
      startWeek: 0,
    },
  ) {
    this._date = date;
    this._options = options;
    this._$target = target;
    this._selected = null;
    this._dateObject = this.getDateObject();
  }

  render() {
    if (!this._$target) {
      return new Error(ERROR.target);
    }
    this._$target.insertAdjacentHTML('afterend', this.getTemplate());
  }

  rerender() {
    if (!this._$target) {
      return new Error(ERROR.target);
    }
    this._$target.querySelector('.woowa-calendar')?.remove();
    this._$target.insertAdjacentHTML('afterend', this.getTemplate());
  }

  getTemplate(): string {
    return 'return template';
  }

  getSelected(type: string = 'date'): Date | string | null {
    if (!this._selected) return null;
    return type === 'date'
      ? this._selected
      : convertDateToString(this._selected);
  }

  getDateObject(): TDateObject {
    return {
      year: this._date.getFullYear(),
      month: this._date.getMonth() + 1,
    };
  }

  getMonth(): number {
    return this._dateObject.month;
  }

  setNextMonth(next = this._dateObject.month) {
    this._date.setMonth(next);
    this.rerender();
  }

  setPrevMonth(prev = this._dateObject.month - 1) {
    this._date.setMonth(prev);
    this.rerender();
  }

  getYear(): number {
    return this._dateObject.year;
  }

  setNextYear(next = this._dateObject.year + 1) {
    this._date.setFullYear(next);
    this.rerender();
  }

  setPrevYear(prev = this._dateObject.year - 1) {
    this._date.setFullYear(prev);
    this.rerender();
  }

  get target(): HTMLElement | null {
    return this._$target;
  }

  set target(target: HTMLElement | null) {
    this._$target = target;
  }

  get date(): Date {
    return this._date;
  }

  set date(date: Date) {
    this._date = date;
    if (this._$target) {
      this.rerender();
    }
  }

  get options(): ICalendarOptions {
    return this._options;
  }

  set options(options: ICalendarOptions) {
    this._options = options;
  }
}
