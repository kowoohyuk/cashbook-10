import { Component } from '../../lib/woowact/index';
import { historyStore } from '../../stores/History';
import { TChartData } from './ChartSection';
import '../../styles/chart/chartTagList';

export default class ChartTagList extends Component<TChartData[]> {
  constructor(data: TChartData[]) {
    super(data);
    this.init();
  }

  generateTagItems() {
    return this.props
      .map(
        item => `
      <div class="chart-tag__item">
      <div class="chart-tag__item__label" style="background-color:${
        item.color
      }">
          ${item.name}
        </div>
        <div class="chart-tag__item__percent">
          ${Math.round(item.percent * 100 * 10) / 10}%
        </div>
        <div class="chart-tag__item__amount">
          ${item.amount.toLocaleString()}
        </div>
      </div>
    `,
      )
      .join('');
  }

  render(): string {
    return `
      <div class="chart-tag__list">
        ${this.generateTagItems()}
      
      </div>
    `;
  }
}
