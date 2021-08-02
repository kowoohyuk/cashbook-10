import IMGButton from './IMGButton';
import { addSVG } from '../../useResource';
import { AddHistoryModal } from '../Modals/AddHistoryModal';

export default class AddButton extends IMGButton {
  constructor() {
    super({
      src: addSVG,
      className: 'add-button',
      onclick: () => this.onclick(),
    });

    this.init();
  }

  onclick() {
    new AddHistoryModal();
  }
}
