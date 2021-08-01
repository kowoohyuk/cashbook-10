import { IHistory, removeHistoryAPI } from '../../apis/historyAPI';
import { eventHandler } from '../../lib/woowact/core/EventHandler';
import { Component } from '../../lib/woowact/index';
import { DELETE_HISTORY, historyStore } from '../../stores/History';
import { toWonForm } from '../../utils/money';
import { $ } from '../../utils/selector';

type HistoryItemProps = {
  history: IHistory;
};

type HistoryItomState = {
  editMode: boolean;
};

export default class HistoryItem extends Component<
  HistoryItemProps,
  HistoryItomState
> {
  constructor(props: HistoryItemProps) {
    super(props);

    this.state = {
      editMode: false,
    };

    this.init();
  }

  componentDidMount() {
    this.addEvents();
  }

  componentDidUpdate() {
    this.addEvents();
  }

  addEvents() {
    const $editBTN = $('.edit-btn', this.$element);
    const $deleteBTN = $('.delete-btn', this.$element);
    const $editConrifmBTN = $('.confirm-btn', this.$element);
    const $cancelBTN = $('.cancel-btn', this.$element);

    $editBTN &&
      eventHandler.addEvent($editBTN, 'click', () =>
        this.setState({
          editMode: true,
        }),
      );

    $editConrifmBTN &&
      eventHandler.addEvent($editConrifmBTN, 'click', () =>
        this.setState({
          editMode: false,
        }),
      );

    $deleteBTN &&
      eventHandler.addEvent($deleteBTN, 'click', () => {
        console.log(this.props.history.id);
        historyStore.dispatch(DELETE_HISTORY, this.props.history.id);
      });

    $cancelBTN &&
      eventHandler.addEvent($cancelBTN, 'click', () =>
        this.setState({ editMode: false }),
      );
  }

  getDateString(date: Date) {
    return date.toString().slice(0, 10);
  }

  render() {
    if (this.state.editMode) {
      return `
      <div>
        <input class="date" type="date" value="${this.getDateString(
          this.props.history.paymentDate,
        )}"/>
        <input class="content" value="${this.props.history.content}"/>
        <select class="isIncome" name="수입/지출" id="cars">
          <option value="income" ${
            this.props.history.isIncome ? 'selected' : ''
          }>입금</option>
          <option value="outcome"${
            this.props.history.isIncome ? '' : 'selected'
          }>출금</option>
        </select>
        <input class="amount" value="${this.props.history.amount}"/>원
          <button class='edit-btn'>완료</button>
          <button class='cancel-btn'>취소</button>
      </div>
      `;
    }
    return `
    <div>
      <div>${this.props.history.paymentDate}</div>
      <div>${this.props.history.content}</div>
      <div>${this.props.history.isIncome ? '입금' : '출금'}
      ${toWonForm(this.props.history.amount)}
    </div>
      <button class='edit-confirm-btn'>수정</button>
      <button class='delete-btn'>삭제</button>
    </div>
    `;
  }
}
