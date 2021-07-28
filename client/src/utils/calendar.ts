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
