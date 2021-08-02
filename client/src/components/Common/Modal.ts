import { Component } from '../../lib/woowact/index';
import { $ } from '../../utils/selector';
import '../../styles/modal.scss';

export class Modal extends Component {
  constructor() {
    super({});

    this.init();
  }

  componentDidMount() {
    const $app = $('.app-body');

    if (!$app) return;

    $app.classList.add('blur');
    $('body')?.appendChild(this.$element);

    this.$element.addEventListener('click', e => {
      if (e.target === this.$element) {
        $app.classList.remove('blur');
        this.$element.remove();
      } else {
        e.preventDefault();
      }
    });
  }

  render() {
    return `
    <div class="modal-background">
      <div class="modal">
        <h2>Hello</h2>
      </div>
    </div>`;
  }
}
