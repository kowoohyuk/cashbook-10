import './index.scss';

interface ICalendarOptions {
  startWeek?: number;
  onClick?: MouseEvent;
  lang: string;
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
  FAIL_TARGET:
    'target 엘리먼트가 지정되어 있지않거나 HTMLElement가 아닙니다.\r\nsetTarget으로 렌더링이 될 target 엘리먼트를 지정해주세요.',
  FAIL_DATE: '유효한 날짜가 아닙니다.',
};

export const convertDateToString = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const getStartWeek = (date: Date, copyDate = new Date(date)) =>
  copyDate.setDate(1) && copyDate.getDay();

export const getLastDate = (date: Date, copyDate = new Date(date)) =>
  copyDate.setDate(0) && copyDate.getDate();

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

export const checkValidDate = (date: Date | string) =>
  !Number.isNaN(new Date(date).getTime());

export const isNowDate = (date: Date | string): boolean => {
  if (!checkValidDate(date)) return false;
  const now = new Date();
  date = new Date(date);
  if (date.getFullYear() !== now.getFullYear()) return false;
  if (date.getMonth() !== now.getMonth()) return false;
  if (date.getDate() !== now.getDate()) return false;
  return true;
};

export default class Calendar {
  private _date: Date;
  private _$target: HTMLElement | null;
  private _options: ICalendarOptions;
  private _selected: HTMLElement | null;
  private _dateObject: TDateObject;
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
    calendarWrap.addEventListener('click', this.onClickEvent);
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

    calendarBody.innerHTML = days
      .map(day => this.generateDayBlock(day))
      .join('');
    this.dayBlocks = calendarBody.querySelectorAll('.day-block');
    return calendarBody;
  }

  private generateDayBlock(day = 0, contents = []) {
    const blockDate = new Date(
      `${this._dateObject.year}-${this._dateObject.month}-${day}`,
    );
    return `
      <div class="day-block ${
        isNowDate(blockDate) ? 'now' : ''
      }" data-date="${blockDate}">
        <div class="day-block__contents">
        ${
          contents.length > 0
            ? contents
                .map(
                  content => `<div class="day-block__content">${content}</div>`,
                )
                .join('')
            : ''
        }
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
      this._selected?.classList.remove('selected');
      this._selected = closest;
      this._selected.classList.add('selected');
    }
  }

  // nextBTN.addEventListener('click', this.setNextMonth);
  // prevBTN.addEventListener('click', this.setNextMonth);

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

  setDate(date: string) {
    this._date = new Date(date);
    this.rerender();
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

  set date(date: Date) {
    if (!checkValidDate) return;
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
