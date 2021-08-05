import { Component } from '../../lib/woowact/index';
import {
  historyStore,
  NEXT_MONTH,
  PREV_MONTH,
  UPDATE_HISTORY,
} from '../../stores/History';
import IMGButton from '../Common/IMGButton';
import {
  leftArrowSVG,
  rightArrowSVG,
  userSVG,
  sunSVG,
  moonSVG,
  signoutSVG,
} from '../../useResource';
import { SigninModal } from '../Modals/SigninModal';
import { getTheme } from '../../utils/theme';
import { alertModal } from '../../utils/alert/alert';

const toggleTheme = () => {
  const theme = getTheme() === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('theme', theme);
};

export class DatePicker extends Component {
  $lightThemeButton: Component;
  $darkThemeButton: Component;
  $prevBTN: Component;
  $nextBTN: Component;

  constructor() {
    super({});

    this.$lightThemeButton = this.addComponent(IMGButton, {
      className: 'theme-button dark-theme-button',
      src: sunSVG,
      onclick: toggleTheme,
    });

    this.$darkThemeButton = this.addComponent(IMGButton, {
      className: 'theme-button light-theme-button',
      src: moonSVG,
      onclick: toggleTheme,
    });

    this.$prevBTN = this.addComponent(IMGButton, {
      src: leftArrowSVG,
      className: 'date-picker__prev-btn',
      onclick: async () => historyStore.dispatch(PREV_MONTH),
    });

    this.$nextBTN = this.addComponent(IMGButton, {
      src: rightArrowSVG,
      className: 'date-picker__next-btn',
      onclick: async () => historyStore.dispatch(NEXT_MONTH),
    });

    historyStore.subscribe(this);
    this.init();
  }

  componentDidUpdate() {
    const theme = getTheme();
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('theme', theme);
  }

  generateSigninButton() {
    return this.addComponent(IMGButton, {
      className: 'user-button signin-button',
      src: userSVG,
      onclick: () => {
        const isLigin = localStorage.getItem('token');

        if (!isLigin) {
          new SigninModal();
        }
      },
    }).html;
  }

  generateSignoutButton() {
    return this.addComponent(IMGButton, {
      className: 'user-button signout-button',
      src: signoutSVG,
      onclick: () => {
        localStorage.removeItem('token');

        alertModal('로그아웃 완료');

        historyStore.dispatch(UPDATE_HISTORY);
      },
    }).html;
  }

  render() {
    return `<div class="date-picker">
    ${this.$lightThemeButton.html}
    ${this.$darkThemeButton.html}
      ${this.$prevBTN.html}
      <div class="date-picker__date">
        <h4 class="date-picker__year">
          ${historyStore.data.year}
        </h4>
        <h2 class="date-picker__month">
          ${historyStore.data.month}
        </h2>
      </div>
      ${this.$nextBTN.html}
      ${
        localStorage.getItem('token')
          ? this.generateSignoutButton()
          : this.generateSigninButton()
      }
    </div>`;
  }
}
