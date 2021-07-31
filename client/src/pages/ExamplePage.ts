import ExampleComponent from '../components/ExampleComponent';
import { Component } from '../lib/woowact/index';
import { numberStore } from '../stores/Number';
import { getArrayN } from '../utils/array';

type ExamplePageState = {
  count: number;
};

export default class ExamplePage extends Component<{}, ExamplePageState> {
  $list: {
    [key: string]: Component;
  } = {};
  constructor() {
    super({});

    numberStore.subscribe(this);

    this.state = {
      count: 2,
    };

    this.init();
  }

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          count: this.state.count + 1,
        }),
      500,
    );
  }

  componentDidUpdate() {
    if (this.state.count < 30) {
      setTimeout(
        () =>
          this.setState({
            count: this.state.count + 1,
          }),
        500,
      );
    }
  }

  generateList(): string {
    return getArrayN(this.state.count)
      .map(
        i =>
          `<li key = ${i}>${Component._(
            this.addComponent(ExampleComponent, { count: i }),
          )}</li>`,
      )
      .join('');
  }

  render(): string {
    return `
    <div>
      <h1>
        ${numberStore.data.pickedNumber} years old.
      </h1>
      <ul>
        ${this.generateList()}
        </ul>
    </div>
    `;
  }
}
