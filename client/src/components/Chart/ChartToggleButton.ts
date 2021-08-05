import { Component } from '../../lib/woowact/index';
import '../../styles/chart/chartToggleButton';

export default class ChartToggleButton extends Component {
  constructor(isIncome: boolean) {
    super(isIncome);
    this.init();
  }

  generateTagItems() {
    return;
  }

  render(): string {
    return `
    <div class="toggle-chart-buttons">
      <button class="toggle-chart-button ${this.props ? '' : 'active'}">
        지출
      </button>
      <button class="toggle-chart-button ${this.props ? 'active' : ''}">
        수입
      </button>
    </div>
    `;
  }
}
