import '../../styles/modals/history.scss';
import { plusSVG, minusSVG, downArrowSVG } from '../../useResource';
import { $ } from '../../utils/selector';
import { eventHandler } from '../../lib/woowact/core/EventHandler';
import { toWonForm } from '../../utils/money';
import Modal from './CoreModal';
import { categoryStore } from '../../stores/Category';
import { getUserPaymentListAPI, TPaymentData } from '../../apis/paymentAPI';
import { Dropdown, TDropdownData, TDropProps } from '../Common/Dropdown';
import { Component } from '../../lib/woowact/index';
import { checkValidDate } from '../../utils/calendar/calendar';
import { addHistoryAPI, IHistory } from '../../apis/historyAPI';
import {
  historyStore,
  INIT_HISTORY,
  UPDATE_HISTORY,
} from '../../stores/History';
import { alertModal } from '../../utils/alert/alert';

type HistoryModalState = {
  isIncome?: boolean;
  amount?: number;
  date: Date;
  categoryId?: number;
  paymentId?: number;
  payments: TPaymentData[];
  isValidDate: boolean;
  content?: string;
};

type HistoryProps = {
  date?: Date;
};

const MSG_SHOW_TIME = 2000;

export class AddHistoryModal extends Modal<HistoryProps, HistoryModalState> {
  $dropdown: Component;
  constructor(props: HistoryProps) {
    super(props);

    this.state = {
      date: props.date ?? new Date(),
      payments: [],
      isValidDate: true,
    };

    const initValue = {
      dataList: [],
      onclick: () => {},
    };
    this.$dropdown = this.addComponent(Dropdown, initValue);
    this.init();
  }

  componentDidMount() {
    this.addEvents();
    this.initPaymentList();
    super.componentDidMount();
  }

  componentDidUpdate() {
    (this.$dropdown as Dropdown).updateData(this.getNewDropdownData());
  }

  getNewDropdownData(): TDropProps {
    const dataList = this.state.payments.map(payment => {
      const data: TDropdownData = {
        label: payment.name,
        value: payment.id,
      };
      return data;
    });

    if (!this.state.paymentId) this.setState({ paymentId: dataList[0].value });

    return {
      dataList,
      onclick: (paymentId: number) => {
        this.setState({ paymentId });
      },
      selected: this.state.paymentId ?? dataList[0].value,
    };
  }

  async initPaymentList() {
    const payments = await getUserPaymentListAPI();

    this.setState({
      payments,
    });
  }

  addEvents() {
    this.addIncomeOutcomeButton();
    this.addEventsToTransferAmount();
    this.addCategoryButtonEvent();
    this.addConfirmEvent();
    this.addEventToTransferDate();
    this.addContentInputEvent();
  }

  translateToNumber(e: InputEvent) {
    const amount: number = this.convertToNumber(
      (e.target as HTMLInputElement).value,
    );

    if (amount > 0) (e.target as HTMLInputElement).value = toWonForm(amount);

    this.setState({
      amount,
    });
  }

  translateToDate(e: InputEvent) {
    const $el: HTMLInputElement = e.target as HTMLInputElement;
    let date = this.convertToNumber($el.value);

    if (date === 0) {
      $el.value = '';
      return;
    }

    if ($el.classList.contains('year')) {
      const dateString = date.toString().slice(0, 4);
      $el.value = dateString;
    }

    if ($el.classList.contains('month')) {
      const dateString = date.toString().slice(0, 2);

      $el.value = dateString;
    }

    if ($el.classList.contains('day')) {
      const dateString = date.toString().slice(0, 2);
      $el.value = dateString;
    }

    this.setState({
      isValidDate: true,
    });
  }

  convertToNumber(str: string): number {
    const MAX_LEN = 11;
    const REGEX = new RegExp('[^0-9]', 'g');

    const num = parseInt(str.replace(REGEX, '').substring(0, MAX_LEN));

    return isNaN(num) ? 0 : num;
  }

  addIncomeOutcomeButton() {
    const $incomeButton = $('.history__income-button', this.$element);
    const $outcomeButton = $('.history__outcome-button', this.$element);

    $incomeButton &&
      eventHandler.addEvent($incomeButton, 'click', () =>
        this.handleIncomeOutcome(true),
      );

    $outcomeButton &&
      eventHandler.addEvent($outcomeButton, 'click', () =>
        this.handleIncomeOutcome(false),
      );
  }

  addEventsToTransferAmount() {
    const $amountInput = $('.history__amount', this.$element);

    $amountInput &&
      eventHandler.addEvent($amountInput, 'input', e =>
        this.translateToNumber(e as InputEvent),
      );
  }

  setValidationResult() {
    const $year = $('.year', this.$element) as HTMLInputElement;
    const $month = $('.month', this.$element) as HTMLInputElement;
    const $day = $('.day', this.$element) as HTMLInputElement;

    if (!$year || !$month || !$day) return;

    let year = $year.value;
    let month = $month.value;
    let day = $day.value;

    $month.value = month.length === 1 ? `0${month}` : month;
    $day.value = day.length === 1 ? `0${day}` : day;

    if (year.length * month.length * day.length === 0) {
      this.setState({
        date: undefined,
      });
      return;
    }

    const dateStr = `${year}-${month}-${day}`;

    if (checkValidDate(dateStr)) {
      this.setState({
        isValidDate: true,
        date: new Date(dateStr),
      });
    } else {
      this.setState({
        isValidDate: false,
        date: undefined,
      });
    }
  }

  addEventToTransferDate() {
    const $dateInput = $('.history__payment-date', this.$element);

    $dateInput &&
      eventHandler.addEvent($dateInput, 'input', e =>
        this.translateToDate(e as InputEvent),
      );

    $dateInput &&
      eventHandler.addEvent($dateInput, 'change', e =>
        this.setValidationResult(),
      );
  }

  addContentInputEvent() {
    const $contentInput = $('.history__content', this.$element);

    $contentInput &&
      eventHandler.addEvent($contentInput, 'change', e => {
        const content: string = (e.target as HTMLInputElement).value;

        if (content.length) {
          this.setState({
            content,
          });
        } else {
          this.setState({
            content: undefined,
          });
        }
      });
  }

  addCategoryButtonEvent() {
    const $categories = $('.history__category', this.$element);

    $categories &&
      eventHandler.addEvent($categories, 'click', e =>
        this.handleCategory(e as MouseEvent),
      );
  }

  addConfirmEvent() {
    const $confirmButton = $('.history__add-button', this.$element);

    $confirmButton &&
      eventHandler.addEvent($confirmButton, 'click', e => {
        this.handleAddNewHistory(e as MouseEvent);
      });
  }

  handleCategory(e: MouseEvent) {
    const $el: HTMLElement = e.target as HTMLElement;
    const key = $el.getAttribute('key');

    if (key && $el.nodeName === 'LI') {
      this.setState({
        categoryId: parseInt(key),
      });
    } else {
      e.preventDefault();
    }
  }

  handleIncomeOutcome(isIncome: boolean) {
    let categoryId = this.state.categoryId;

    if (categoryId && categoryStore.getData(categoryId).isIncome !== isIncome)
      categoryId = undefined;

    this.setState({
      isIncome: isIncome,
      categoryId,
    });
  }

  checkSubmitable(): boolean {
    const {
      isIncome,
      amount,
      isValidDate,
      date,
      categoryId,
      paymentId,
      content,
    } = this.state;

    return (
      isIncome !== undefined &&
      !!amount &&
      isValidDate &&
      checkValidDate(date) &&
      categoryId !== undefined &&
      paymentId !== undefined &&
      content !== '' &&
      !!content
    );
  }

  generateCategoryList(): string {
    return categoryStore.data.categories
      .filter(
        category =>
          this.state.isIncome === undefined ||
          category.isIncome === this.state.isIncome,
      )
      .map(
        category =>
          `<li key="${category.id}" ${
            this.state.categoryId === category.id
              ? `class="category-${category.id}"`
              : ''
          }>${category.name}</li>`,
      )
      .join('');
  }

  async handleAddNewHistory(e: MouseEvent) {
    const $button: HTMLButtonElement = e.target as HTMLButtonElement;

    $button.disabled = true;

    if (
      !this.state.amount ||
      this.state.isIncome === undefined ||
      !this.state.categoryId ||
      !this.state.content ||
      !this.state.paymentId
    )
      return;

    const data: IHistory = {
      amount: this.state.amount,
      paymentDate: this.state.date,
      isIncome: this.state.isIncome,
      paymentId: this.state.paymentId,
      categoryId: this.state.categoryId,
      content: this.state.content,
    };

    const result = await addHistoryAPI(data);

    alertModal('내역이 추가되었습니다');

    historyStore.dispatch(INIT_HISTORY);
    this.closeModal();
  }

  generatePaymentDateInput = () => {
    const date = this.props.date ? this.props.date : new Date();
    const year: string = date.getFullYear().toString();
    const month: string = (date.getMonth() + 1).toString();
    const day: string = date.getDate().toString();

    return `
    <div class="history__payment-date ${
      this.state.isValidDate ? '' : 'invalid'
    }">
      <input class="history__date-input year"
      placeholder="${year}"
      value="${year}"
      />
      -
      <input class="history__date-input month"
      placeholder="${month.length === 1 ? `0${month}` : `${month}`}"
      value="${month.length === 1 ? `0${month}` : `${month}`}"
      />
      -
      <input class="history__date-input day"
      placeholder="${day.length === 1 ? `0${day}` : `${day}`}"
      value="${day.length === 1 ? `0${day}` : `${day}`}"
      />
    </div>
  `;
  };

  generateSelectIncome = () => `
    <div class="history__select">
      <button class="history__income-button" ${
        !this.state.isIncome ? '' : 'disabled="true"'
      }>
        <img src=${plusSVG} alt="income-icon">
      </button>
      <button class="history__outcome-button" ${
        this.state.isIncome === undefined || this.state.isIncome
          ? ''
          : 'disabled="true"'
      }>
        <img src=${minusSVG} alt="income-icon">
      </button>
    </div>
  `;

  modal = () => {
    return `
    <div class="add-history-modal">
      ${this.generatePaymentDateInput()}
      ${this.generateSelectIncome()}
      <div class="history__amount">
        <input placeholder="₩000,000">
      </div>
      <div class="history__category">
        ${this.generateCategoryList()}
      </div>
      <div class="history__method">
        ${this.$dropdown.html}
      </div>
      <div class="history__content">
        <input placeholder="내용을 입력해주세요">
      </div>
      <button class="history__add-button" ${
        this.checkSubmitable() ? '' : 'disabled="true"'
      }>추가하기</button>
    </div>
    `;
  };
}
