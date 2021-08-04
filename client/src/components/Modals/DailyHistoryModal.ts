import { historyStore } from '../../stores/History';
import { HistoryBrief } from '../History/HistoryBrief';
import HistoryList from '../History/HistoryList';
import Modal from './CoreModal';
import '../../styles/modals/daily.scss';

export type TDailyHistoryModalProps = {
  date: Date;
};

export class DailyHistoryModal extends Modal<TDailyHistoryModalProps, {}> {
  constructor(props: TDailyHistoryModalProps) {
    super(props);

    historyStore.subscribe(this);
    this.init();
  }

  modal(): string {
    console.log(this.props.date);
    const dateList = historyStore.getDailyHistory(this.props.date);

    return `
      <div class="daily-history-modal">
      ${this.addComponent(HistoryBrief, dateList).html}
      ${dateList.length ? this.addComponent(HistoryList, dateList).html : ''}
      </div>
    `;
  }
}
