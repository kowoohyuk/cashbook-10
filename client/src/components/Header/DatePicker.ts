import { Component } from '../../lib/woowact/index';
import { historyStore, NEXT_MONTH, PREV_MONTH } from '../../stores/History';
import IMGButton from '../Common/IMGButton';
import {
  leftArrowSVG,
  rightArrowSVG,
  userSVG,
  sunSVG,
  moonSVG,
} from '../../useResource';
import { SigninModal } from '../Modals/SigninModal';
import { getTheme } from '../../utils/theme';

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
  $loginButton: Component;

  constructor() {
    super({});

    this.$lightThemeButton = this.addComponent(IMGButton, {
      className: 'theme-button dark-theme-button',
      src: moonSVG,
      onclick: toggleTheme,
    });

    this.$darkThemeButton = this.addComponent(IMGButton, {
      className: 'theme-button light-theme-button',
      src: sunSVG,
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

    this.$loginButton = this.addComponent(IMGButton, {
      className: 'user-button',
      src: userSVG,
      onclick: () => {
        new SigninModal();
      },
    });

    historyStore.subscribe(this);
    this.init();
  }

  componentDidUpdate() {
    const theme = getTheme();
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('theme', theme);
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
      ${this.$loginButton.html}
    </div>`;
  }
}
