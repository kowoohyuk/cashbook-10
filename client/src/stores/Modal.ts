import { Store } from '../lib/woowact/core/Store';

export const INIT_MODAL = 'MODAL/INIT' as const;
export const OPEN_MODAL = 'MODAL/OPEN' as const;
export const CLOSE_MODAL = 'MODAL/CLOSE' as const;

type TModalData = {
  isOpen: boolean;
  $content?: HTMLElement;
};

class ModalStore extends Store<TModalData> {
  constructor(modalData: TModalData) {
    super(modalData);
  }

  actions = {
    [INIT_MODAL]: this.initModal.bind(this),
    [OPEN_MODAL]: this.openModal.bind(this),
    [CLOSE_MODAL]: this.closeModal.bind(this),
  };

  initModal($content: HTMLElement): Partial<TModalData> {
    if (this.data.$content) {
      console.error('Default content is already exist');
      return {};
    } else {
      return {
        $content,
        isOpen: false,
      };
    }
  }

  openModal($content: HTMLElement): Partial<TModalData> {
    const $origin = this.data.$content;

    if ($origin === $content) return { isOpen: !!$origin };

    $origin?.replaceWith($content);

    return {
      $content,
      isOpen: true,
    };
  }

  closeModal(): Partial<TModalData> {
    return {
      isOpen: false,
    };
  }

  updateStore = (action: string, newModalData: Partial<TModalData>) => {
    if (!newModalData) return null;

    switch (action) {
      case INIT_MODAL:
        this.updateData(newModalData);
        break;
      case OPEN_MODAL:
        this.updateData(newModalData);
        break;
      case CLOSE_MODAL:
        this.updateData(newModalData);
        break;
      default:
        break;
    }
  };
}

export const modalStore: ModalStore = new ModalStore({ isOpen: false });
