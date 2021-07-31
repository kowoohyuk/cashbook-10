import { Component } from '../lib/woowact/index';
import { CHANGE_NUMBER, numberStore } from '../stores/Number';

type ExampleComponentProps = {
  count: number;
};

export default class ExampleComponent extends Component<ExampleComponentProps> {
  constructor(props: ExampleComponentProps) {
    super(props);

    this.init();
  }

  render() {
    return `
      <div>${this.props.count}</div>
    `;
  }
}
