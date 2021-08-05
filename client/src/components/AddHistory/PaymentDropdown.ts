import {
  deleteUserPaymentAPI,
  getUserPaymentListAPI,
  TUserPaymentData,
} from '../../apis/paymentAPI';
import { eventHandler } from '../../lib/woowact/core/EventHandler';
import { Component } from '../../lib/woowact/index';
import { paymentStore } from '../../stores/Payment';
import '../../styles/dropdown.scss';
import { closeWhiteSVG, downArrowSVG } from '../../useResource';
import { $ } from '../../utils/selector';
import { AddPaymentModal } from './AddPayment';

export type TDropProps = {
  onclick: (value: number | undefined) => void;
};

export type TDropdownState = {
  paymentList: TUserPaymentData[];
  selected?: number;
  isOpen: boolean;
};

export class PaymentDropdown extends Component<TDropProps, TDropdownState> {
  constructor(props: TDropProps) {
    super(props);

    this.state = {
      paymentList: [],
      isOpen: false,
    };

    paymentStore.subscribe(this);

    this.initList();
    this.init();
  }

  async initList() {
    const paymentList = await getUserPaymentListAPI();

    console.log(paymentList);
    this.setState({
      paymentList,
    });
  }

  componentDidMount() {
    const $button = $('.dropdown__button', this.$element);

    $button && eventHandler.addEvent($button, 'click', () => this.switch());

    const $list = $('.dropdown__list', this.$element);

    $list &&
      eventHandler.addEvent($list, 'click', e =>
        this.selectButton(e as MouseEvent),
      );
  }

  public updateData(props: TDropProps) {
    this.props = props;
    this.updateBy();
  }

  selectButton(e: MouseEvent) {
    const $el = e.target as HTMLElement;

    let key = null;

    if ($el.nodeName === 'LI') {
      key = (e.target as HTMLElement).getAttribute('key');
      key && this.selectPayment(key);
    } else if ($el.nodeName === 'SPAN') {
      key = (e.target as HTMLElement).parentElement?.getAttribute('key');
      key && this.selectPayment(key);
    }

    if ($el.nodeName === 'BUTTON') {
      key = (e.target as HTMLElement).getAttribute('key');
      key && this.removePayment(key);
    } else if ($el.nodeName === 'IMG') {
      key = (e.target as HTMLElement).parentElement?.getAttribute('key');
      key && this.removePayment(key);
    }

    if (!key) return;
  }

  openAddPaymentModal() {
    new AddPaymentModal({
      onsubmit: () => this.initList(),
    });
  }

  selectPayment(key: string) {
    if (key === 'add') {
      this.openAddPaymentModal();
      return;
    }

    const value: number = parseInt(key);

    this.setState({
      selected: value,
      isOpen: false,
    });

    this.props.onclick(value);
  }

  async removePayment(id: string) {
    const result = await deleteUserPaymentAPI(parseInt(id));
    const paymentList = await getUserPaymentListAPI();

    this.setState({
      paymentList,
      selected: undefined,
      isOpen: false,
    });

    this.props.onclick(undefined);
  }

  switch() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  setItem = (data: TUserPaymentData) => `
  <li key="${data.paymentId}" class="dropdown__item
  ${
    this.state.selected && this.state.selected === data.paymentId
      ? 'selected'
      : ''
  }">
    <span class="label">
      ${data.name}
    </span>
    <button class="delete-button" key="${data.paymentId}">
      <img src=${closeWhiteSVG} alt="imgButton">
    </button>
  </li>
  `;

  findName() {
    return (
      this.state.paymentList.find(
        data => data.paymentId === this.state.selected,
      )?.name ?? '선택 해주세요'
    );
  }

  render(): string {
    return `
    <div class="dropdown">
      <div class="dropdown__button">
        <span class="dropdown__selected-label">
          ${this.findName()}
        </span>
        <img class="arrow-icon ${
          this.state.isOpen ? 'up' : 'down'
        }" src=${downArrowSVG}>
      </div>
      <div class="dropdown__list ${this.state.isOpen ? 'show' : 'hide'}">
        ${this.state.paymentList.map(data => this.setItem(data)).join('')}
        <li key="add" class="dropdown__item">
          <span class="label">+</span>
        </li>
      </div>
    </down>
  `;
  }
}
