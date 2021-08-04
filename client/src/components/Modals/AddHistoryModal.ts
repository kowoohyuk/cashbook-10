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
import { insertChar } from '../../utils/string';
import { checkValidDate } from '../../utils/calendar/calendar';

type HistoryModalState = {
  isIncome?: boolean;
  amount?: number;
  date: Date;
  categoryId?: number;
  paymentId: number;
  warningMessage: string;
  payments: TPaymentData[];
  isValidDate: boolean;
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
      date: new Date(),
      paymentId: 1,
      warningMessage: '',
      payments: [],
      isValidDate: false,
    };

    const initValue = { dataList: [], onclick: () => {} };
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

    return {
      dataList,
      onclick: (paymentId: number) => {
        this.setState({ paymentId });
      },
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
  }

  translateToNumber(e: InputEvent) {
    const amount: number = this.convertToNumber(
      (e.target as HTMLInputElement).value,
    );

    (e.target as HTMLInputElement).value = toWonForm(amount);
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
    const regex = new RegExp('[^0-9]', 'g');

    const num = parseInt(str.replace(regex, ''));

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

    if (year.length * month.length * day.length === 0) return;

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
    const { isIncome, amount, isValidDate, date, categoryId, paymentId } =
      this.state;

    return (
      isIncome !== undefined &&
      !!amount &&
      isValidDate &&
      checkValidDate(date) &&
      !!categoryId &&
      !!paymentId
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

  handleAddNewHistory(e: MouseEvent) {
    const $button: HTMLButtonElement = e.target as HTMLButtonElement;

    $button.disabled = true;

    const data = this.state;

    setTimeout(() => {
      let result = true; //TODO: asyn로 api 요청 결과 받아오기
      if (result) {
        console.log('ADD NEW HISTORY SUCCESS!', data);
        return;
      }
      //TODO: server error 메세지 받아와서 보여주기~!
      $button.disabled = false;
      this.showWarnMSG(
        '히스토리 추가를 실패했습니다. 잠시 후 다시 시도해주세요',
      );
      data;
    }, 2000);
  }

  showWarnMSG(msg: string) {
    this.setState({
      warningMessage: msg,
    });

    setTimeout(() => {
      this.setState({
        warningMessage: '',
      });
    }, MSG_SHOW_TIME);
  }

  changeDropdownValue = (value: string) => {
    console.log(value);
  };

  modal(): string {
    return `
    <div class="add-history-modal">
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
      <div class="history__amount">
        <input placeholder="₩000,000">
      </div>
      <div class="history__payment-date ${
        this.state.isValidDate ? '' : 'invalid'
      }">
        <input class="history__date-input year"
        placeholder="${new Date().getUTCFullYear()}"/>
        -
        <input class="history__date-input month"
        placeholder="0${new Date().getUTCMonth()}"/>
        -
        <input class="history__date-input day"
        placeholder="0${new Date().getUTCDay()}"/>
      </div>
      <div class="history__category">
        ${this.generateCategoryList()}
      </div>
      <div class="history__method">
        ${this.$dropdown.html}
      </div>
      <button class="history__add-button" ${
        this.checkSubmitable() ? '' : 'disabled="true"'
      }>추가하기</button>
      <small class="fail-message">
        ${this.state.warningMessage}
      </small>
    </div>
    `;
  }
}
