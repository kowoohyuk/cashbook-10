import IMGButton from './IMGButton';
import { addSVG } from '../../useResource';

export default class AddButton extends IMGButton {
  constructor() {
    super({
      src: addSVG,
      className: 'add-button',
      onclick: () => this.onclick(),
    });

    this.init();
  }

  onclick() {}
}
