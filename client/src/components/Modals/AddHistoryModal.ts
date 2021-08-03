import '../../styles/modals/history.scss';
import { Component } from '../../lib/woowact/index';
import { plusSVG, minusSVG, downArrowSVG } from '../../useResource';
import { $ } from '../../utils/selector';
import { eventHandler } from '../../lib/woowact/core/EventHandler';
import { toWonForm } from '../../utils/money';
import { DEFAULT_CATEGORY } from '../History/HistoryItem';
import Modal from './CoreModal';

type HistoryModalState = {
  isIncome?: boolean;
  amount?: number;
  date?: Date;
  categoryId?: number;
  paymentMethod: number;
  warningMessage: string;
};

type HistoryProps = {
  date?: Date;
};

const MSG_SHOW_TIME = 2000;

export class AddHistoryModal extends Modal<HistoryProps, HistoryModalState> {
  constructor(props: HistoryProps) {
    super(props);

    this.state = {
      date: props.date ?? new Date(),
      paymentMethod: 1,
      warningMessage: '',
    };

    this.init();
  }

  getDateString() {
    return this.state.date?.toISOString().slice(0, 10);
  }

  componentDidMount() {
    this.addEvents();
    super.componentDidMount();
  }

  addEvents() {
    this.addIncomeOutcomeButton();
    this.addEventsToTransferAmount();
    this.addCategoryButtonEvent();
    this.addConfirmEvent();
  }

  translateToNumber(e: InputEvent) {
    const amount: number = this.convertToNumber(
      (e.target as HTMLInputElement).value,
    );

    (e.target as HTMLInputElement).value = toWonForm(
      isNaN(amount) ? 0 : amount,
    );
    this.setState({
      amount,
    });
  }

  convertToNumber(str: string): number {
    const regex = new RegExp('[^0-9]', 'g');
    const maxLength = 11;

    return parseInt(str.replace(regex, '').substring(0, maxLength));
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

    if (categoryId && DEFAULT_CATEGORY[categoryId - 1].isIncome !== isIncome)
      categoryId = undefined;

    this.setState({
      isIncome: isIncome,
      categoryId,
    });
  }

  checkSubmitable(): boolean {
    const { isIncome, amount, date, categoryId, paymentMethod } = this.state;

    return (
      isIncome !== undefined &&
      !!amount &&
      !!date &&
      !!categoryId &&
      !!paymentMethod
    );
  }

  generateCategoryList(): string {
    return DEFAULT_CATEGORY.filter(
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

  getPaymentName(): string {
    const id = this.state.paymentMethod;

    return '현금'; // TODO: id 비교해서 name 반환하기
  }

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
      <input class="history__payment-date"
        placeholder="2021-08-21"
        value="${this.getDateString()}"
      />
      <div class="history__category">
        ${this.generateCategoryList()}
      </div>
      <div class="history__method">
        <div>
          ${this.getPaymentName()}
        </div>
        <img src=${downArrowSVG} alt="more-icon" />
      </div>
      <button class="history__add-button" ${
        this.checkSubmitable() ? '' : 'disabled="true"'
      }>추가하기</button>
      <small class="fail-message">${this.state.warningMessage}</small>
    </div>
    `;
  }
}
