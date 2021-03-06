import Modal from './CoreModal';
import '../../styles/modals/signup.scss';
import { showSVG, hideSVG } from '../../useResource';
import { $ } from '../../utils/selector';
import { eventHandler } from '../../lib/woowact/core/EventHandler';
import { checkEmailAPI, signinAPI, signupAPI } from '../../apis/userAPI';

import {
  checkEmailValidation,
  checkPWLength,
  checkPWValidation,
  EMAIL_VALIDATION_ERR_MSG,
  PW_VALIDATION_ERR_MSG,
} from '../../utils/validations';
import { alertModal } from '../../utils/alert/alert';
import { historyStore, UPDATE_HISTORY } from '../../stores/History';

type SignupModalState = {
  isShowingPW: boolean;
  isValidEmail: boolean;
  isCheckEmail: boolean;
  isValidPW: boolean;
  emailMSG: string;
  pwMSG: string;
  resultMSG: string;
};
const ALERT_TIME: number = 2000;

export class SignupModal extends Modal<{}, SignupModalState> {
  constructor() {
    super({});

    this.state = {
      isShowingPW: false,
      isValidEmail: false,
      isCheckEmail: false,
      isValidPW: false,
      emailMSG: '',
      pwMSG: '',
      resultMSG: ' ',
    };

    this.init();
  }

  componentDidMount() {
    this.addEvents();
    super.componentDidMount();
  }

  addEvents() {
    this.addPWShowHideEvent();
    this.inputValidationEvent();
    this.addEmailCheckEvent();
    this.addSignupEvent();
  }

  addPWShowHideEvent() {
    const $pwBTN = $('.pw-button', this.$element);

    $pwBTN &&
      eventHandler.addEvent($pwBTN, 'click', () =>
        this.setState({ isShowingPW: !this.state.isShowingPW }),
      );
  }

  inputValidationEvent() {
    const $email = $('.email-input', this.$element);
    const $pw = $('.pw-input', this.$element);

    $email &&
      eventHandler.addEvent($email, 'keyup', e =>
        this.checkEmailInput(e as InputEvent),
      );

    $email &&
      eventHandler.addEvent($email, 'change', () =>
        this.showEmailValidationMSG(),
      );

    $pw &&
      eventHandler.addEvent($pw, 'keyup', e => {
        this.checkPWInput(e as InputEvent);
      });

    $pw &&
      eventHandler.addEvent($pw, 'change', () => this.showPWValidationMSG());
  }

  addEmailCheckEvent() {
    const $checkBTN = $('.check-button', this.$element);

    $checkBTN &&
      eventHandler.addEvent($checkBTN, 'click', () =>
        this.checkEmailDuplication(),
      );
  }

  async checkEmailDuplication() {
    const email = ($('.email-input', this.$element) as HTMLInputElement)?.value;

    //const result = await checkEmailDuplicationAPI(email);

    const $checkBTN = $('.check-button');

    if ($checkBTN) {
      $checkBTN.className = 'check-button-confirm';
      //?????? ?????? ????????? ????????? ????????? ?????? ???????????? ?????? ?????? ??????..!
      ($checkBTN as HTMLButtonElement).disabled = true;
    }
    const data = await checkEmailAPI(email);
    if (data) {
      this.setState({
        isValidEmail: false,
        emailMSG: '?????? ?????? ?????? ??????????????????.',
      });
    } else {
      ($checkBTN as HTMLButtonElement).disabled = false;
      this.setState({
        isCheckEmail: true,
      });
    }
  }

  checkEmailInput(e: InputEvent) {
    const email = (e.target as HTMLInputElement).value;

    const isValid = checkEmailValidation(email);

    this.setState({
      emailMSG: '',
      isCheckEmail: false,
      isValidEmail: isValid,
    });
  }

  checkPWInput(e: InputEvent) {
    const pw = (e.target as HTMLInputElement).value;

    const isValid = checkPWValidation(pw);

    this.setState({
      pwMSG: '',
      isValidPW: isValid,
    });
  }

  showEmailValidationMSG() {
    const email = ($('.email-input', this.$element) as HTMLInputElement)?.value;

    !checkEmailValidation(email) &&
      this.setState({ emailMSG: EMAIL_VALIDATION_ERR_MSG });
  }

  showPWValidationMSG() {
    const pw = ($('.pw-input', this.$element) as HTMLInputElement)?.value;

    !checkPWLength(pw) && this.setState({ pwMSG: PW_VALIDATION_ERR_MSG });
  }

  addSignupEvent() {
    const $signupBTN = $('.signup-button', this.$element);

    $signupBTN &&
      eventHandler.addEvent($signupBTN, 'click', () => this.handleSignup());
  }

  alertError(cb: Function) {
    setTimeout(() => {
      this.setState({
        resultMSG: ' ',
      });
      cb();
    }, ALERT_TIME);
  }

  async handleSignup() {
    const email = ($('.email-input', this.$element) as HTMLInputElement)?.value;
    const pw = ($('.pw-input', this.$element) as HTMLInputElement)?.value;

    const $signupBTN = $('.signup-button');
    ($signupBTN as HTMLButtonElement).disabled = true;

    const data = await signupAPI({
      email,
      pw,
    });
    if (data.error) {
      this.setState({
        resultMSG: '??????????????? ?????????????????????. ?????? ??? ?????? ??????????????????',
      });
      this.alertError(
        () => (($signupBTN as HTMLButtonElement).disabled = false),
      );
    } else {
      localStorage.setItem('token', data.token);
      historyStore.dispatch(UPDATE_HISTORY);
      alertModal('??????????????? ?????????????????? :)');
      this.closeModal();
    }
  }

  modal(): string {
    return `
    <div class="signup-modal">
      <div class="title-logo">
        <span class="primary">????????????</span>??? ?????? <span class="primary">??????</span>
      </div>
      <div class="email-input-area">
        <input class="email-input" placeholder="???????????? ??????????????????"></input>
        <small>${this.state.emailMSG}</small>
        <button ${
          this.state.isValidEmail ? '' : 'disabled="true"'
        } class="check-button${this.state.isCheckEmail ? '-confirm' : ''}">
          ????????????
        </button>
      </div>
      <div class="pw-input-area ${this.state.isCheckEmail ? 'show' : 'hide'}">
        <input class="pw-input" placeholder="10?????? ????????? ??????, ?????? ?????? ????????? ??????"
          type="${this.state.isShowingPW ? 'input' : 'password'}">
        </input>
        <small>${this.state.pwMSG}</small>
        <button class="pw-button">
          <img src=${
            this.state.isShowingPW ? hideSVG : showSVG
          } alt="pw-show-hide-button"/>
        </button>
      </div>
      <button class="signup-button"
      ${
        this.state.isCheckEmail && this.state.isValidPW ? '' : 'disabled="true"'
      }>
        ????????????
      </button>
    </div>
    `;
  }
}
