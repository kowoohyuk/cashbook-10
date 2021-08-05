import { eventHandler } from '../../lib/woowact/core/EventHandler';
import { ADD_PAYMENT, paymentStore } from '../../stores/Payment';
import '../../styles/modals/payment.scss';
import { alertModal } from '../../utils/alert/alert';
import { $ } from '../../utils/selector';
import Modal from '../Modals/CoreModal';

type AddPaymentProps = {
  onsubmit: () => {};
};
type AddPaymentModalState = {
  paymentName: string;
};

export class AddPaymentModal extends Modal<
  AddPaymentProps,
  AddPaymentModalState
> {
  constructor(props: AddPaymentProps) {
    super(props);
    this.state.paymentName = '';

    this.init();
  }

  componentDidMount() {
    this.addEvents();
    super.componentDidMount();
  }

  addEvents() {
    this.addInputEvent();
    this.addCancleEvent();
    this.addSubmitEvent();
  }

  addCancleEvent() {
    const $cancelBTN = $('.cancel-button', this.$element);

    $cancelBTN &&
      eventHandler.addEvent($cancelBTN, 'click', () => {
        this.closeModal();
      });
  }
  addSubmitEvent() {
    const $submitBTN = $('.submit-button', this.$element);

    $submitBTN &&
      eventHandler.addEvent($submitBTN, 'click', async () => {
        const result = await paymentStore.dispatch(
          ADD_PAYMENT,
          this.state.paymentName,
        );

        alertModal('결제 수단이 추가 되었습니다.');
        this.props.onsubmit();
        this.closeModal();
      });
  }

  addInputEvent() {
    const $input: HTMLInputElement = $(
      '.add-payment__input',
      this.$element,
    ) as HTMLInputElement;

    $input &&
      eventHandler.addEvent($input, 'input', () => {
        this.setState({
          paymentName: $input.value,
        });
      });
  }

  async handleAddNewPayment(e: MouseEvent) {}

  modal = () => {
    return `
    <div class="add-payment-modal">
      <h3 class="add-payment__title">결제수단 추가하기</h3>
      <input class="add-payment__input" placeholder="입력하기">
      <div class="add-payment__buttons">
        <button class="cancel-button">취소</button>
        <button class="submit-button"
        ${this.state.paymentName.length ? '' : ' disabled="true"'}>
          추가
        </button>
      </div>
    </div>
    `;
  };
}
