import Link from '../../lib/woowact/core/Router';
import { Component } from '../../lib/woowact/index';
import { DatePicker } from './DatePicker';

import '../../styles/header.scss';

export class Header extends Component {
  $mainLink: Component;
  $datePicker: Component;

  constructor() {
    super({});
    this.$mainLink = this.addComponent(Link, { to: '/' });
    this.$datePicker = this.addComponent(DatePicker);

    this.init();
  }

  render() {
    return `<header>
      ${this.$datePicker.html}
    </header>`;
  }
}
