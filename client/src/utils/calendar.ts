interface ICalendarOptions {
  startWeek?: number;
  onClick?: MouseEvent;
}

type TDateObject = {
  year: number;
  month: number;
  date?: number;
};

type TWeekTexts = {
  [key: string]: string[];
};

const WEEK_TEXTS: TWeekTexts = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ko: ['일', '월', '화', '수', '목', '금', '토'],
};

const ERROR = {
  target:
    'target 엘리먼트가 지정되어 있지않거나 HTMLElement가 아닙니다.\r\nsetTarget으로 렌더링이 될 target 엘리먼트를 지정해주세요.',
};

export const convertDateToString = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const getStartWeek = (date: Date, copyDate = new Date(date)) =>
  copyDate.setDate(1) && copyDate.getDay();

export const getLastDate = (date: Date, copyDate = new Date(date)) =>
  copyDate.setDate(0) && copyDate.getDate();

export const getDateOfWeek = (date: Date, language = 'ko') =>
  WEEK_TEXTS[language][date.getDay()];

export const getDateObject = (date: Date | string): TDateObject => {
  date = new Date(date);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };
};

export const checkValidDate = (date: Date | string) =>
  !Number.isNaN(new Date(date).getTime());

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
    this._dateObject = getDateObject(this._date);
  }

  render() {
    if (!this._$target) {
      return new Error(ERROR.target);
    }
    // return this.getTemplate();
  }

  rerender() {
    if (!this._$target) {
      return new Error(ERROR.target);
    }
    this._$target.querySelector('.woowa-calendar')?.remove();
    // 리렌더링 관련한 함수 새로 작성
    // this._$target.insertAdjacentHTML('afterend', );
  }

  getSelected(type: string = 'date'): Date | string | null {
    if (!this._selected) return null;
    return type === 'date'
      ? this._selected
      : convertDateToString(this._selected);
  }

  getMonth(): number {
    return this._dateObject.month;
  }

  // nextBTN.addEventListener('click', this.setNextMonth);
  // prevBTN.addEventListener('click', this.setNextMonth);
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
