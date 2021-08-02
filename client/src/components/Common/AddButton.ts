import IMGButton from './IMGButton';
import { addSVG } from '../../useResource';
import { modalStore, OPEN_MODAL } from '../../stores/Modal';

export default class AddButton extends IMGButton {
  $el: HTMLElement;
  constructor() {
    super({
      src: addSVG,
      className: 'add-button',
      onclick: () => this.onclick(),
    });

    this.$el = document.createElement('div');
    this.$el.innerHTML = '<h2>안녕하세요</h2>';

    this.init();
  }

  onclick() {
    modalStore.dispatch(OPEN_MODAL, this.$el);
  }
}
