import { eventHandler } from '../../lib/woowact/core/EventHandler';
import { Component } from '../../lib/woowact/index';
import '../../styles/dropdown.scss';
import { downArrowSVG } from '../../useResource';
import { $ } from '../../utils/selector';

export type TDropdownData = {
  label: string;
  value: number;
};

export type TDropProps = {
  dataList: TDropdownData[];
  selected?: number;
  onclick: (value: number) => void;
};

export type TDropdownState = {
  selected?: number;
  isOpen: boolean;
};

export class Dropdown extends Component<TDropProps, TDropdownState> {
  constructor(props: TDropProps) {
    super(props);

    this.state = {
      selected: props.selected,
      isOpen: false,
    };

    this.init();
  }

  componentDidMount() {
    const $button = $('.dropdown__button', this.$element);

    $button && eventHandler.addEvent($button, 'click', () => this.switch());

    const $list = $('.dropdown__list', this.$element);

    $list &&
      eventHandler.addEvent($list, 'click', e =>
        this.selectButton(e as MouseEvent),
      );
  }

  public updateData(props: TDropProps) {
    this.props = props;
    this.updateBy();
  }

  selectButton(e: MouseEvent) {
    const $el = e.target as HTMLElement;

    if ($el.nodeName !== 'LI') return;

    const key = (e.target as HTMLElement).getAttribute('key');

    if (!key) return;

    const value: number = parseInt(key);

    this.setState({
      selected: value,
      isOpen: false,
    });
    this.props.onclick(value);
  }

  switch() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  setItem = (data: TDropdownData) => `
  <li key="${data.value}" class="dropdown__item
  ${
    this.state.selected && this.state.selected === data.value ? 'selected' : ''
  }">
    <span class="label">
      ${data.label}
    </span>
  </li>
  `;

  findName(id: number) {
    return this.props.dataList.find(data => data.value === id)?.label;
  }

  render(): string {
    return `
    <div class="dropdown">
      <div class="dropdown__button">
        <span class="dropdown__selected-label">
          ${
            this.state.selected
              ? this.findName(this.state.selected)
              : '선택 해주세요'
          }
        </span>
        <img class="arrow-icon ${
          this.state.isOpen ? 'up' : 'down'
        }" src=${downArrowSVG}>
      </div>
      <ul class="dropdown__list ${this.state.isOpen ? 'show' : 'hide'}">
        ${this.props.dataList.map(data => this.setItem(data)).join('')}
      </ul>
    </down>
  `;
  }
}
