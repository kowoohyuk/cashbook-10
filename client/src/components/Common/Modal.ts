import { eventHandler } from '../../lib/woowact/core/EventHandler';
import { Component } from '../../lib/woowact/index';
import { CLOSE_MODAL, INIT_MODAL, modalStore } from '../../stores/Modal';
import '../../styles/modal';

export class Modal extends Component {
  constructor() {
    super({});

    modalStore.subscribe(this);

    this.init();
  }

  closeModal = (e: MouseEvent) => {
    if (e.target === this.$element) {
      modalStore.dispatch(CLOSE_MODAL);
    } else {
      e.preventDefault();
    }
  };
  componentDidMount() {
    modalStore.dispatch(INIT_MODAL, this.$element.firstElementChild);

    this.$element.addEventListener('click', e => this.closeModal(e));
  }

  render() {
    return `<div class="modal-background ${
      modalStore.data.isOpen ? 'modal-fade' : 'modal-hide'
    }">
    <div></div>
    </div>`;
  }
}
