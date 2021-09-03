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
import { signinAPI } from '../../apis/userAPI';
import { alertModal } from '../../utils/alert/alert';
import { historyStore, UPDATE_HISTORY } from '../../stores/History';
import { getGithubTokenAPI } from '../../apis/authAPI';

type SigninModalState = {
  isShowingPW: boolean;
  isSignable: boolean;
  emailMSG: string;
  pwMSG: string;
  resultMSG: string;
};

const ALERT_TIME: number = 2000;

export class SigninModal extends Modal<{}, SigninModalState> {
  constructor() {
    super({});

    this.state = {
      isShowingPW: false,
      isSignable: false,
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
    this.moveToSignupEvent();
    this.addSigninEvent();
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

  addSigninEvent() {
    const $signinBTN = $('.signin-button', this.$element);
    const $githubBTN = $('.github-login', this.$element);
    const $woowaBTN = $('.woowa-login', this.$element);

    $signinBTN &&
      eventHandler.addEvent($signinBTN, 'click', () => this.handleSignin());

    $githubBTN &&
      eventHandler.addEvent($githubBTN, 'click', () =>
        this.handleGithuhSignin(),
      );

    $woowaBTN &&
      eventHandler.addEvent($woowaBTN, 'click', () => this.handleEasySignin());
  }

  alertError(cb: Function) {
    setTimeout(() => {
      this.setState({
        resultMSG: ' ',
      });
      cb();
    }, ALERT_TIME);
  }

  async handleGithuhSignin() {
    const result = await getGithubTokenAPI();
  }

  async handleEasySignin() {
    const data = await signinAPI({
      email: 'test@test.com',
      pw: 'test@test.com',
    });
    if (!data) {
      this.setState({
        resultMSG:
          '로그인에 실패하였습니다. 이메일 또는 비밀번호를 확인해주세요.',
      });
    } else {
      localStorage.setItem('token', data.token);
      historyStore.dispatch(UPDATE_HISTORY);

      alertModal('로그인 성공');
      this.closeModal();
    }
  }

  async handleSignin() {
    const email = ($('.email-input', this.$element) as HTMLInputElement)?.value;
    const pw = ($('.pw-input', this.$element) as HTMLInputElement)?.value;

    const $signinBTN = $('.signin-button');
    ($signinBTN as HTMLButtonElement).disabled = true;

    const data = await signinAPI({
      email,
      pw,
    });
    if (!data) {
      this.setState({
        resultMSG:
          '로그인에 실패하였습니다. 이메일 또는 비밀번호를 확인해주세요.',
      });
      this.alertError(
        () => (($signinBTN as HTMLButtonElement).disabled = false),
      );
    } else {
      localStorage.setItem('token', data.token);
      historyStore.dispatch(UPDATE_HISTORY);
      alertModal('로그인 성공');
      this.closeModal();
    }
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

    !checkEmailValidation(email) &&
      this.setState({ emailMSG: EMAIL_VALIDATION_ERR_MSG });
  }

  showPWValidationMSG() {
    const pw = ($('.pw-input', this.$element) as HTMLInputElement)?.value;

    !checkPWLength(pw) && this.setState({ pwMSG: PW_VALIDATION_ERR_MSG });
  }

  modal(): string {
    return `
    <div class="signin-modal">
      <div class="title-logo">
        <span class="primary">로그인</span> 좀 하고 <span class="primary">가계</span>
      </div>
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
      <div class="easy-login-area">
        <button class="easy-login github-login">Github 아이디로 로그인하기</button>
        <button class="easy-login woowa-login">시연용 아이디로 로그인하기</button>
      </div>
    </div>
    `;
  }
}
