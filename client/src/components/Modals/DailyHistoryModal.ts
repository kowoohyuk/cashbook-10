import { historyStore, NEXT_MONTH, PREV_MONTH } from '../../stores/History';
import { HistoryBrief } from '../History/HistoryBrief';
import HistoryList from '../History/HistoryList';
import Modal from './CoreModal';
import '../../styles/modals/daily.scss';
import { $ } from '../../utils/selector';
import { eventHandler } from '../../lib/woowact/core/EventHandler';
import { AddHistoryModal } from './AddHistoryModal';
import {
  getDateFromObject,
  getDateObject,
} from '../../utils/calendar/calendar';
import {
  addSVG,
  emptyPNG,
  leftArrowSVG,
  rightArrowSVG,
} from '../../useResource';
import { IHistory } from '../../apis/historyAPI';
import Component from '../../lib/woowact/core/Component';
import IMGButton from '../Common/IMGButton';

type TDailyHistoryState = {
  date: Date;
};

export class DailyHistoryModal extends Modal<{}, TDailyHistoryState> {
  $lastDay: Component;
  $nextDay: Component;

  constructor(date: Date) {
    super({});

    this.state = {
      date,
    };

    this.$lastDay = this.addComponent(IMGButton, {
      src: leftArrowSVG,
      className: 'day-change-button',
      onclick: () => this.moveToLastDay(),
    });

    this.$nextDay = this.addComponent(IMGButton, {
      src: rightArrowSVG,
      className: 'day-change-button',
      onclick: () => this.moveToNextDay(),
    });

    historyStore.subscribe(this);
    this.init();
  }

  componentDidMount() {
    const $addButton = $('.add-history-button', this.$element);

    $addButton &&
      eventHandler.addEvent(
        $addButton,
        'click',
        () =>
          new AddHistoryModal({
            date: this.state.date,
          }),
      );

    super.componentDidMount();
  }

  moveToNextDay() {
    const nextDay = new Date(this.state.date);
    nextDay.setDate(nextDay.getDate() + 1);

    if (nextDay.getMonth() !== this.state.date.getMonth()) {
      historyStore.dispatch(NEXT_MONTH);
    }

    this.setState({
      date: new Date(nextDay),
    });
  }

  moveToLastDay() {
    const lastDay = new Date(this.state.date);
    lastDay.setDate(lastDay.getDate() - 1);

    if (lastDay.getMonth() !== this.state.date.getMonth()) {
      historyStore.dispatch(PREV_MONTH);
    }

    this.setState({
      date: lastDay,
    });
  }

  generateHistoryList(dateList: IHistory[]): string {
    return `
    ${
      dateList.length
        ? this.addComponent(HistoryList, dateList).html
        : `
      <div class="history-empty-notification">
        <img src="${emptyPNG}" alt="empty-list"/>
        데이터가 없습니다. 내역을 추가해주세요
      </div>
    `
    }
    `;
  }

  modal(): string {
    const dateList = historyStore.getDailyHistory(this.state.date);
    const { year, month, date } = getDateObject(this.state.date);
    return `
      <div class="daily-history-modal">
        <div class="daily-history__title">
          ${this.$lastDay.html}
          <h3 class="daily-history__date">
            ${year}. ${month < 10 ? `0${month}` : month}
            . ${date && date < 10 ? `0${date}` : date}
          </h3>
          ${this.$nextDay.html}
        </div>
        ${this.addComponent(HistoryBrief, dateList).html}
        ${this.generateHistoryList(dateList)}
        <button class='add-history-button'>
          <img src=${addSVG}/>
        </button>
      </div>
    `;
  }
}
