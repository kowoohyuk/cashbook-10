import { Component } from '../../lib/woowact/index';
import { TChartData } from './ChartSection';
import '../../styles/chart/chartTagList';

type TChartTagList = {
  open: boolean;
};

export default class ChartTagList extends Component<
  TChartData[],
  TChartTagList
> {
  constructor(data: TChartData[]) {
    super(data);
    this.init();
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    this.$element
      .querySelector('.chart-tag-toggle-button')
      ?.addEventListener('click', () => this.toggleTagList());
  }

  toggleTagList() {
    this.setState({
      open: !this.state.open,
    });
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
      <div class="chart-tag__list ${this.state.open ? 'open' : ''}">
        ${this.generateTagItems()}
        <button class="chart-tag-toggle-button">
          ${this.state.open ? '접기' : '펼치기'}
        </button>
      </div>
    `;
  }
}
