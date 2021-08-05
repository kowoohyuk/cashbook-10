import './index.scss';

interface ICalendarOptions {
  startWeek?: number;
  onClick?: MouseEvent;
  lang: string;
}

export type TDateObject = {
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
  FAIL_TARGET:
    'target 엘리먼트가 지정되어 있지않거나 HTMLElement가 아닙니다.\r\nsetTarget으로 렌더링이 될 target 엘리먼트를 지정해주세요.',
  FAIL_DATE: '유효한 날짜가 아닙니다.',
};

export const convertDateToString = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const getStartWeek = (date: Date, copyDate = new Date(date)) =>
  copyDate.setDate(1) && copyDate.getDay();

export const getLastDate = (date: Date) => {
  const copyDate = new Date(date);
  copyDate.setMonth(copyDate.getMonth() + 1);
  copyDate.setDate(0);
  return copyDate.getDate();
};

export const getDateOfWeek = (date: Date, language = 'ko') => {
  language = WEEK_TEXTS[language] ? language : 'ko';
  return WEEK_TEXTS[language][date.getDay()];
};

export const getDateObject = (date: Date | string): TDateObject => {
  date = new Date(date);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };
};

export const getDateFromObject = (dateObject: TDateObject) => {
  return new Date(`${dateObject.year}-${dateObject.month}-${dateObject.date}`);
};

export const checkValidDate = (date: Date | string) =>
  !Number.isNaN(new Date(date).getTime());

export const checkValidDateObject = ({ year, month, date }: TDateObject) => {
  const tmpDate = new Date(`${year} ${month} ${date}`);
  if (!checkValidDate(tmpDate)) return false;
  return tmpDate.getMonth() !== Number(month);
};

export const isNowDate = (date: Date | string): boolean => {
  if (!checkValidDate(date)) return false;
  const now = new Date();
  date = new Date(date);
  if (date.getFullYear() !== now.getFullYear()) return false;
  if (date.getMonth() !== now.getMonth()) return false;
  if (date.getDate() !== now.getDate()) return false;
  return true;
};

export const checkSameDate = (dateA: Date, dateB: Date): boolean => {
  return (
    JSON.stringify(getDateObject(dateA)) ===
    JSON.stringify(getDateObject(dateB))
  );
};

const CALENDARBLOCK_COUNT = 42;

export default class Calendar {
  private _date: Date;
  private _$target: HTMLElement | null;
  private _options: ICalendarOptions;
  private _selected: HTMLElement | null;
  private _contents: string[];
  private _dateObject: TDateObject;
  private _onClickCallBack: any;
  public dayBlocks: NodeListOf<HTMLElement> | null;

  constructor(
    target: any = null,
    date: Date | string = new Date(),
    options: ICalendarOptions = {
      startWeek: 0,
      lang: 'ko',
    },
  ) {
    this._date = new Date(date);
    this._options = options;
    this._$target = target;
    this._selected = null;
    this._contents = [];
    this._onClickCallBack = null;
    this._dateObject = getDateObject(this._date);
    this.dayBlocks = null;
  }

  render() {
    if (!this._$target) {
      return this.generateCalendar();
    } else {
      this._$target.appendChild(this.generateCalendar());
    }
  }

  rerender() {
    if (!this._$target) {
      return this.generateCalendar();
    } else {
      this._$target.querySelector('.woowa-calendar')?.remove();
      this._$target.appendChild(this.generateCalendar());
    }
  }

  private generateCalendar() {
    const calendarWrap = document.createElement('div');
    calendarWrap.className = 'woowa-calendar';
    calendarWrap.appendChild(this.generateCalendarHeader());
    calendarWrap.appendChild(this.generateCalendarBody());
    calendarWrap.addEventListener('click', e => this.onClickEvent(e));
    return calendarWrap;
  }

  private generateCalendarHeader() {
    const calendarHeader = document.createElement('ul');
    calendarHeader.className = 'calendar-header';
    calendarHeader.innerHTML = `
      ${WEEK_TEXTS[this._options.lang].reduce(
        (acc, cur) => acc + `<li>${cur}</li>`,
        '',
      )}
    `;
    return calendarHeader;
  }

  private generateCalendarBody() {
    const calendarBody = document.createElement('div');
    calendarBody.className = 'calendar-body';
    const days = new Array(getStartWeek(this._date)).fill('').concat(
      Array(getLastDate(this._date))
        .fill(0)
        .map((_, i) => i + 1),
    );
    const lastDate = days.length - 1;

    calendarBody.innerHTML = days
      .concat(new Array(CALENDARBLOCK_COUNT - days.length).fill(''))
      .map((day, index) =>
        this.generateDayBlock(day > lastDate ? 0 : day, index),
      )
      .join('');
    this.dayBlocks = calendarBody.querySelectorAll('.day-block');
    return calendarBody;
  }

  private generateDayBlock(day = 0, index: number) {
    const blockDate = new Date(
      `${this._dateObject.year}-${this._dateObject.month}-${day}`,
    );
    const blockContents = this._contents[index];
    return `
      <div class="day-block ${isNowDate(blockDate) ? 'now' : ''} ${
      day < 1 ? 'empty-day' : ''
    }" data-date="${day > 0 ? blockDate : ''}">
        <div class="day-block__content">
        ${blockContents?.length ? blockContents : ''}
        </div>
        <div class="day-block__day">${day > 0 ? day : ''}</div>
      </div>
    `;
  }

  public getSelected(type: string = 'date'): Date | string | null {
    if (!this._selected) return null;
    return type === 'date'
      ? new Date(this._selected.dataset.date as string)
      : convertDateToString(new Date(this._selected.dataset.date as string));
  }

  public getDateObject() {
    return getDateObject(this._date);
  }

  private onClickEvent(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const closest = target.closest('.day-block') as HTMLElement;
    if (closest) {
      this._onClickCallBack(closest as HTMLElement);
      this._selected?.classList.remove('selected');
      this._selected = closest;
      this._selected.classList.add('selected');
    }
  }

  setMonth(number: number) {
    this.changeDate('month', number);
  }

  setNextMonth() {
    this.changeDate('month', 0, 1);
  }

  setPrevMonth() {
    this.changeDate('month', 0, -1);
  }

  setYear(number: number) {
    this.changeDate('year', number);
  }

  setNextYear() {
    this.changeDate('year', 0, 1);
  }

  setPrevYear() {
    this.changeDate('year', 0, -1);
  }

  changeDate(type: string, number: number = 0, direction: number = 0) {
    if (type === 'year') {
      this._date.setFullYear(number || this._dateObject.year + direction);
    } else {
      this._date.setMonth(number || this._dateObject.month + direction);
    }
    this._dateObject = getDateObject(this._date);
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

  set date(date: Date | string) {
    if (!checkValidDate) return;

    this._date = new Date(date);
    this._dateObject = getDateObject(this._date);

    if (this._$target) {
      this.rerender();
    }
  }

  set contents(contents: string[]) {
    this._contents = contents;
  }

  get options(): ICalendarOptions {
    return this._options;
  }

  set options(options: ICalendarOptions) {
    this._options = options;
  }

  set onClickCallBack(callback: (target: HTMLElement) => void) {
    this._onClickCallBack = callback;
  }
}
