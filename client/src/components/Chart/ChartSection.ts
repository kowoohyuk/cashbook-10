import { IHistory } from '../../apis/historyAPI';
import { CATERORIES } from '../../utils/categories';
import { Component } from '../../lib/woowact/index';
import { historyStore } from '../../stores/History';
import '../../styles/chart/chartSection';

type TDonutArcData = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isLargeArcFlag: number;
};

export default class ChartSection extends Component {
  constructor() {
    super({});
    historyStore.subscribe(this);
    this.init();
  }

  render() {
    return `
    <section class="chart-section">
    <div class="svg-wrapper">
      <svg width="250" height="250" viewBox="-1.5 -1.5 3 3">
        ${this.generateChart()}
      </svg>
    </div>
    </section>
    `;
  }
}
