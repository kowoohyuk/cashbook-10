import Link from '../../lib/woowact/core/Router';
import { Component } from '../../lib/woowact/index';
import { DatePicker } from './DatePicker';

import '../../styles/header.scss';
import IMGButton from '../Common/IMGButton';
import { userSVG } from '../../useResource';
import { SigninModal } from '../Modals/SigninModal';

export class Header extends Component {
  $mainLink: Component;
  $datePicker: Component;
  $loginButton: Component;

  constructor() {
    super({});
    this.$mainLink = this.addComponent(Link, { to: '/' });
    this.$datePicker = this.addComponent(DatePicker);
    this.$loginButton = this.addComponent(IMGButton, {
      className: 'user-button',
      src: userSVG,
      onclick: () => {
        new SigninModal();
      },
    });

    this.init();
  }

  render() {
    return `<header>
      ${this.$datePicker.html}
      ${this.$loginButton.html}
    </header>`;
  }
}
