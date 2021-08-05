import { IHistory } from '../../apis/historyAPI';
import { CATERORIES } from '../../utils/categories';
import { Component } from '../../lib/woowact/index';
import { historyStore } from '../../stores/History';
import ChartTagList from './ChartTagList';
import ChartToggleButton from './ChartToggleButton';
import LineChart from './LineChart';
import '../../styles/chart/chartSection';
import { getLastDate } from '../../utils/calendar/calendar';

type TDonutArcData = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isLargeArcFlag: number;
};

export type TChartData = {
  id: number;
  name: string;
  color: string;
  amount: number;
  percent: number;
};

export type TChartSectionState = {
  isIncome: boolean;
};

const SVG_PATH = 'http://www.w3.org/2000/svg';
const PRIMARY_COLOR = '#2ac1bc';
const ERROR_COLOR = '#f45452';
const INCOME_TEXT = '수입';
const OUTCOME_TEXT = '지출';

export default class ChartSection extends Component<{}, TChartSectionState> {
  private sum: number = 0;
  private chartData: TChartData[];

  constructor() {
    super({});
    historyStore.subscribe(this);
    this.state = {
      isIncome: false,
    };
    this.chartData = [];
    this.init();
  }

  toggleIsIncome() {
    this.setState({
      isIncome: !this.state.isIncome,
    });
  }
  createChartData(histories: any[]) {
    this.sum = 0;
    const data: TChartData[] = histories.reduce((acc, cur) => {
      if (this.state.isIncome !== cur.isIncome) return acc;
      if (acc[cur.categoryId]) {
        acc[cur.categoryId].amount += cur.amount;
      } else {
        const { name, color } = CATERORIES[cur.categoryId];
        acc[cur.categoryId] = {
          id: cur.categoryId,
          name,
          color,
          percent: 0,
          amount: cur.amount,
        };
      }
      this.sum += cur.amount;
      return acc;
    }, []);
    data.sort((a, b) => b.amount - a.amount);
    data.forEach(d => {
      d.percent = d.amount / this.sum;
    });
    this.chartData = data;
  }

  getCoordinatesForPercent(percent: number) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  generateToggleButton() {
    return this.addComponent(ChartToggleButton, {
      isIncome: this.state.isIncome,
      toggleIsIncome: () => this.toggleIsIncome(),
    }).html;
  }

  generateChartAmountTag() {
    this.createChartData(historyStore.data.histories);
    return `
    <div class="chart-title">
      <p>이번달은 총</p>
      <p><span>${this.sum.toLocaleString()}</span>원</p>
      <p>쓰셨네요!</p>
    </div>`;
  }

  generateChart() {
    this?.$element?.querySelector('.svg-wrapper')?.remove();
    return `
    <div class="svg-wrapper">
      <svg width="250" height="250" viewBox="-1.5 -1.5 3 3">
        ${this.generateDonutChart()}
      </svg>
    </div>
    `;
  }

  generateLineChart() {
    console.log(historyStore);
    let count = 0;
    const values = new Array(
      getLastDate(
        new Date(`${historyStore.data.year}-${historyStore.data.month}-01`),
      ),
    ).fill(0);
    historyStore.data.histories.forEach(history => {
      if (history.isIncome === this.state.isIncome) {
        values[new Date(history.paymentDate).getDate()] += history.amount;
        count++;
      }
    });
    const lineDatas = {
      color: this.state.isIncome ? PRIMARY_COLOR : ERROR_COLOR,
      title: this.state.isIncome ? INCOME_TEXT : OUTCOME_TEXT,
      values,
    };
    console.log(lineDatas);
    return count ? this.addComponent(LineChart, lineDatas).html : '';
  }

  generateChartTagList() {
    return this.addComponent(ChartTagList, this.chartData).html;
  }

  generateDonutChart() {
    let accumlatePercent = 0;
    const paths = this.chartData
      .map((d, index) => {
        const [startX, startY] =
          this.getCoordinatesForPercent(accumlatePercent);
        accumlatePercent += d.percent;
        const [endX, endY] = this.getCoordinatesForPercent(accumlatePercent);
        const isLargeArcFlag = d.percent > 0.5 ? 1 : 0;

        return this.getCategoryDataPath(
          d,
          { startX, startY, endX, endY, isLargeArcFlag },
          index,
        );
      })
      .join('');
    return paths;
  }

  getCategoryDataPath(
    { percent, color }: TChartData,
    { startX, startY, endX, endY, isLargeArcFlag }: TDonutArcData,
    index: number,
  ) {
    const targetRad = 2 * Math.PI * percent;
    const targetRestRad = 2 * Math.PI * (1 - percent);
    const animationDuration = 0.2;
    const $path = document.createElementNS(SVG_PATH, 'path');
    $path.setAttribute(
      'd',
      `M ${startX} ${startY} A 1 1 0 ${isLargeArcFlag} 1 ${endX} ${endY} L 0 0`,
    );
    $path.setAttribute('fill', 'none');
    $path.setAttribute('stroke-width', '0.2');
    $path.setAttribute('stroke', `${color}`);
    $path.setAttribute('stroke-dasharray', `${targetRad} ${targetRestRad}`);
    $path.setAttribute('stroke-dashoffset', `${targetRad}`);

    const $animate = document.createElementNS(SVG_PATH, 'animate');
    $animate.setAttribute('attributeName', 'stroke-dashoffset');
    $animate.setAttribute('begin', `${animationDuration * index}`);
    $animate.setAttribute('from', `${targetRad}`);
    $animate.setAttribute('to', '0.025');
    $animate.setAttribute('dur', `${animationDuration}`);
    $animate.setAttribute('fill', 'freeze');
    $path.appendChild($animate);
    return $path.outerHTML;
  }

  render() {
    return `
    <section class="chart-section">
      <div class="chart-container">
        ${this.generateToggleButton()}
        ${this.generateChartAmountTag()}
        ${this.generateChart()}
        ${this.generateChartTagList()}
        ${this.generateLineChart()}
      </div>
    </section>
    `;
  }
}
