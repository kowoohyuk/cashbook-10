import { IHistory } from '../../apis/historyAPI';
import { Component } from '../../lib/woowact/index';
import { DELETE_HISTORY, historyStore } from '../../stores/History';
import { deleteSVG, editSVG } from '../../useResource';
import { toWonForm } from '../../utils/money';
import IMGButton from '../Common/IMGButton';

export const DEFAULT_CATEGORY = [
  {
    id: 1,
    name: '생활',
    isIncome: false,
  },
  {
    id: 2,
    name: '식비',
    isIncome: false,
  },
  {
    id: 3,
    name: '교통',
    isIncome: false,
  },
  {
    id: 4,
    name: '쇼핑/뷰티',
    isIncome: false,
  },
  {
    id: 5,
    name: '의료/건강',
    isIncome: false,
  },
  {
    id: 6,
    name: '문화/여가',
    isIncome: false,
  },
  {
    id: 7,
    name: '미분류',
    isIncome: false,
  },
  {
    id: 8,
    name: '월급',
    isIncome: true,
  },
  {
    id: 9,
    name: '용돈',
    isIncome: true,
  },
  {
    id: 10,
    name: '기타수입',
    isIncome: true,
  },
];

type HistoryItemProps = {
  history: IHistory;
};
export default class HistoryItem extends Component<HistoryItemProps> {
  $deleteBTN: Component;

  constructor(props: HistoryItemProps) {
    super(props);

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
    //this.props.history.paymentId
    return '현대카드'; //TODO: 나중에 id-name 리스트 받아와서 반환하기
  }

  render() {
    return `
    <div class="history-item">
      <div class="history-item__left">
        <div class="history-item__category category-${
          this.props.history.categoryId
        }">${DEFAULT_CATEGORY[this.props.history.categoryId - 1].name}</div>
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
      ${this.$deleteBTN.html}
    </div>
    `;
  }
}
