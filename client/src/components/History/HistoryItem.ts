import { IHistory } from '../../apis/historyAPI';
import { Component } from '../../lib/woowact/index';
import { categoryStore } from '../../stores/Category';
import { DELETE_HISTORY, historyStore } from '../../stores/History';
import { paymentStore } from '../../stores/Payment';
import { deleteSVG, editSVG } from '../../useResource';
import { toWonForm } from '../../utils/money';
import IMGButton from '../Common/IMGButton';

type HistoryItemProps = {
  history: IHistory;
};
export default class HistoryItem extends Component<HistoryItemProps> {
  $deleteBTN: Component;

  constructor(props: HistoryItemProps) {
    super(props);

    paymentStore.subscribe(this);
    this.$deleteBTN = this.addComponent(IMGButton, {
      src: deleteSVG,
      onclick: () => {
        this.$element.classList.add('deleted');
        this.$element.ontransitionend = async () => {
          this.$element.ontransitionend = null;
          historyStore.dispatch(DELETE_HISTORY, this.props.history.id);
        };
      },
    });

    this.init();
  }

  getDateString(date: Date) {
    return date.toString().slice(0, 10);
  }

  getPaymentName() {
    return paymentStore.getName(this.props.history.paymentId);
  }

  render() {
    return `
    <div class="history-item">
      <div class="history-item__left">
        <div class="history-item__category category-${
          this.props.history.categoryId
        }">${categoryStore.getName(this.props.history.categoryId)}</div>
        <div class="history-item__content">${this.props.history.content}</div>
      </div>
      <div class="history-item__right">
        <div class="history-item__upper">
          <span class="history-item__payment">${this.getPaymentName()}</span>
        </div>
        <div class="history-item__amount ${
          this.props.history.isIncome ? 'income' : 'outcome'
        }">
          ${this.props.history.isIncome ? '+' : '-'}
          ${toWonForm(this.props.history.amount)}
        </div>
      </div>
      ${localStorage.getItem('token') ? this.$deleteBTN.html : ''}
    </div>
    `;
  }
}
