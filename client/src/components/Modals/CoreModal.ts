import { Component } from '../../lib/woowact/index';
import { $ } from '../../utils/selector';
import '../../styles/modals/index.scss';
import { PropsType, StateType } from '../../lib/woowact/core/Component';

export default abstract class Modal<
  P extends PropsType = PropsType,
  T extends StateType = StateType,
> extends Component<P, T> {
  $app: HTMLElement | null;
  constructor(props: P) {
    super(props);
    this.$app = $('.app-body');
  }

  componentDidMount() {
    if (!this.$app) return;

    this.makeModal();
  }

  makeModal() {
    // backgorund blur 시키기
    this.$app?.classList.add('blur');
    // body에 앨리먼트 추가
    const $modal: HTMLElement = this.$element;
    $('body')?.appendChild($modal);

    $modal.addEventListener('click', this.closeModal.bind(this));
  }
  closeModal(e?: MouseEvent) {
    //바깥 영역을 클릭했을 때 or 직접 불러준다면
    if (!e || e.target === this.$element) {
      // background blur 해제
      this.$app?.classList.remove('blur');
      // 본인 컴포넌트 삭제하기
      this.$element.remove();
    } else {
      e.preventDefault();
    }
  }

  protected abstract modal(): string;

  render(): string {
    return `
    <div class='modal-background'>
      ${this.modal()}
    </div>
    `;
  }
}
