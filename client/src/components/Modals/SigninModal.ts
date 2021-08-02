import Modal from './CoreModal';
import '../../styles/modals/signin.scss';
import { showSVG, hideSVG } from '../../useResource';
import { $ } from '../../utils/selector';
import { eventHandler } from '../../lib/woowact/core/EventHandler';
import { SignupModal } from './SignupModal';
import {
  checkEmailValidation,
  checkPWLength,
  EMAIL_VALIDATION_ERR_MSG,
  PW_VALIDATION_ERR_MSG,
} from '../../utils/validations';

type SigninModalState = {
  isShowingPW: boolean;
  isSignable: boolean;
  emailMSG: string;
  pwMSG: string;
};

export class SigninModal extends Modal<{}, SigninModalState> {
  constructor() {
    super({});

    this.state = {
      isShowingPW: false,
      isSignable: false,
      emailMSG: '',
      pwMSG: '',
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
    this.moveToSignupEvent();
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
      eventHandler.addEvent($email, 'keyup', () => {
        this.setState({ emailMSG: '' });
        this.checkValidation();
      });

    $email &&
      eventHandler.addEvent($email, 'change', () =>
        this.showEmailValidationMSG(),
      );

    $pw &&
      eventHandler.addEvent($pw, 'keyup', () => {
        this.setState({ pwMSG: '' });
        this.checkValidation();
      });

    $pw &&
      eventHandler.addEvent($pw, 'change', () => this.showPWValidationMSG());
  }

  moveToSignupEvent() {
    const $signupBTN = $('.signup-button', this.$element);

    $signupBTN &&
      eventHandler.addEvent(
        $signupBTN,
        'click',
        this.goToSignupModal.bind(this),
      );
  }

  goToSignupModal() {
    this.$element.remove();
    new SignupModal();
  }

  checkValidation() {
    const email = ($('.email-input', this.$element) as HTMLInputElement)?.value;
    const pw = ($('.pw-input', this.$element) as HTMLInputElement)?.value;

    this.setState({
      isSignable: checkEmailValidation(email) && checkPWLength(pw),
    });
  }

  showEmailValidationMSG() {
    const email = ($('.email-input', this.$element) as HTMLInputElement)?.value;

    !checkPWLength(email) &&
      this.setState({ emailMSG: EMAIL_VALIDATION_ERR_MSG });
  }

  showPWValidationMSG() {
    const pw = ($('.pw-input', this.$element) as HTMLInputElement)?.value;

    !checkPWLength(pw) && this.setState({ pwMSG: PW_VALIDATION_ERR_MSG });
  }

  modal(): string {
    return `
    <div class="signin-modal">
      <div class="email-input-area">
        <input class="email-input" placeholder="이메일을 입력해주세요"></input>
        <small>${this.state.emailMSG}</small>
      </div>
      <div class="pw-input-area">
        <input class="pw-input" placeholder="비밀번호를 입력해주세요"
          type="${this.state.isShowingPW ? 'input' : 'password'}">
        </input>
        <small>${this.state.pwMSG}</small>
        <button class="pw-button">
          <img src=${
            this.state.isShowingPW ? hideSVG : showSVG
          } alt="pw-show-hide-button"/>
        </button>
      </div>
      <button ${
        this.state.isSignable ? '' : 'disabled="true"'
      } class="signin-button">로그인</button>

      <span class="signup-notification">
        아직 회원이 아니라면?
        <a class="signup-button">
          가입하기
        </a>
      </span>
    </div>
    `;
  }
}
