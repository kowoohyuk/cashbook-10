import Modal from './CoreModal';
import '../../styles/modals/signup.scss';
import { showSVG, hideSVG } from '../../useResource';
import { $ } from '../../utils/selector';
import { eventHandler } from '../../lib/woowact/core/EventHandler';

import {
  checkEmailValidation,
  checkPWLength,
  checkPWValidation,
  EMAIL_VALIDATION_ERR_MSG,
  PW_VALIDATION_ERR_MSG,
} from '../../utils/validations';

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
      //중복 체크 요청을 여러번 날리는 것을 방지하기 위해 버튼 막기..!
      ($checkBTN as HTMLButtonElement).disabled = true;
    }
    //TODO: api 연동하기~!
    //지금 이거는 테스트코드
    setTimeout(() => {
      //
      console.log('check finish!');

      ($checkBTN as HTMLButtonElement).disabled = false;
      this.setState({
        isCheckEmail: true,
      });
      return;
      //
      console.log('check failed!');

      this.setState({
        isValidEmail: false,
        emailMSG: '이미 사용 중인 이메일입니다.',
      });
      //
    }, 1000);
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

  async handleSignup() {
    const $signupBTN = $('.signup-button');

    ($signupBTN as HTMLButtonElement).disabled = true;

    //TODO: true면 user 정보 저장(로그인 처리) 후 닫기
    //현재 아래의 settimeout은 테스트용
    //TODO: false면 실패 메세지 날려주기
    setTimeout(() => {
      this.setState({
        resultMSG: '회원가입에 실패하였습니다. 잠시 후 다시 시도해주세요',
      });

      //2초(ALERT_TIME) 뒤에 메세지 없애주기
      setTimeout(() => {
        ($signupBTN as HTMLButtonElement).disabled = false;
        this.setState({
          resultMSG: ' ',
        });
      }, ALERT_TIME);
    }, ALERT_TIME);
  }

  modal(): string {
    return `
    <div class="signup-modal">
      <div class="email-input-area">
        <input class="email-input" placeholder="이메일을 입력해주세요"></input>
        <small>${this.state.emailMSG}</small>
        <button ${
          this.state.isValidEmail ? '' : 'disabled="true"'
        } class="check-button${this.state.isCheckEmail ? '-confirm' : ''}">
          중복확인
        </button>
      </div>
      <div class="pw-input-area ${this.state.isCheckEmail ? 'show' : 'hide'}">
        <input class="pw-input" placeholder="10글자 이상의 문자, 숫자 혹은 알파벳 조합"
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
      }
      >회원가입</button>
      <div class="result-msg-box"><small>${this.state.resultMSG}</small></div>
    </div>
    `;
  }
}
