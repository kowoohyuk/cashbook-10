import { Component } from '../../lib/woowact/index';
import HistoryList from './HistoryList';

export default class HistorySection extends Component {
  $historyList: Component;
  constructor() {
    super({});
    this.$historyList = this.addComponent(HistoryList);
    this.init();
  }
  render() {
    return `
    <section class="history-section">
      ${Component._(this.$historyList)}
    </section>
    `;
  }
}
