import { IHistory, removeHistoryAPI } from '../../apis/historyAPI';
import { Component } from '../../lib/woowact/index';
import { INIT_HISTORY } from '../../models/History';
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

  addEvents() {
    const $editBTN = $('.edit-btn', this.$element);
    const $deleteBTN = $('.delete-btn', this.$element);
    const $editConrifmBTN = $('.confirm-btn', this.$element);
    const $cancelBTN = $('.cancel-btn', this.$element);

    if ($editBTN) {
      $editBTN.addEventListener('click', () =>
        this.setState({
          editMode: true,
        }),
      );
    }
    if ($editConrifmBTN) {
      $editConrifmBTN.addEventListener('click', () =>
        this.setState({
          editMode: false,
        }),
      );
    }
    if ($deleteBTN) {
      $deleteBTN.addEventListener('click', async () => this.removeHistory());
    }
    if ($cancelBTN) {
      $cancelBTN.addEventListener('click', () =>
        this.setState({ editMode: false }),
      );
    }
  }

  async removeHistory() {
    const id = this.props.history.id;

    if (id) {
      const result = await removeHistoryAPI(id);

      if (result) this.$element.remove();
    }
  }

  async updateHistory() {}

  componentDidMount() {
    this.addEvents();
  }
  componentDidUpdate() {
    this.addEvents();
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
      <button class='edit-btn'>수정</button>
      <button class='delete-btn'>삭제</button>
    </div>
    `;
  }
}
