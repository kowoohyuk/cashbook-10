import IMGButton from './IMGButton';
import { addSVG } from '../../useResource';
import { AddHistoryModal } from '../Modals/AddHistoryModal';
import { SigninModal } from '../Modals/SigninModal';

export default class AddButton extends IMGButton {
  constructor() {
    super({
      src: addSVG,
      className: 'add-button',
      onclick: () => {
        this.onclick();
      },
    });

    this.init();
  }

  onclick() {
    const isLigin = localStorage.getItem('token');

    if (isLigin) {
      new AddHistoryModal({});
    } else new SigninModal();
  }
}
