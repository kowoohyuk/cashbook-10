import { downArrowSVG } from '../../useResource';
import { Component } from '../../lib/woowact/index';

export type DropdownItem = {
  [value: number]: string;
};

type DropdownProps = {
  default?: DropdownItem;
  items: DropdownItem[];
  onclick: (value: number) => {};
};

type DropdownState = {
  selected?: DropdownItem;
  isOpen: boolean;
};

export default class Dropdown extends Component<DropdownProps, DropdownState> {
  constructor(props: DropdownProps) {
    super(props);

    this.state = {
      selected: this.props.default,
      isOpen: false,
    };

    this.init();
  }

  render() {
    return ``;
  }
}
