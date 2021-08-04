import { IHistory } from '../../apis/historyAPI';
import { CATERORIES } from '../../utils/categories';
import { Component } from '../../lib/woowact/index';
import { historyStore } from '../../stores/History';
import ChartTagList from './ChartTagList';
import '../../styles/chart/chartSection';

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

// 임시
const histories: any[] = [
  {
    amount: 150000,
    categoryId: 1,
    isIncome: false,
    name: '1번',
  },
  {
    amount: 150000,
    categoryId: 2,
    isIncome: false,
    name: '2번',
  },
  {
    amount: 150000,
    categoryId: 3,
    isIncome: false,
    name: '3번',
  },
  {
    amount: 150000,
    categoryId: 5,
    isIncome: false,
    name: '5번',
  },
  {
    amount: 177000,
    categoryId: 6,
    isIncome: false,
    name: '6번',
  },
  {
    amount: 10000,
    categoryId: 4,
    isIncome: false,
    name: '7번',
  },
  {
    amount: 15000,
    categoryId: 3,
    isIncome: false,
    name: '9번',
  },
  {
    amount: 33000,
    categoryId: 2,
    isIncome: false,
    name: '3번',
  },
  {
    amount: 8000,
    categoryId: 1,
    isIncome: false,
    name: '2번',
  },
  {
    amount: 177000,
    categoryId: 10,
    isIncome: true,
    name: '6번',
  },
  {
    amount: 18000,
    categoryId: 9,
    isIncome: true,
    name: '7번',
  },
  {
    amount: 15000,
    categoryId: 9,
    isIncome: true,
    name: '9번',
  },
  {
    amount: 33000,
    categoryId: 8,
    isIncome: true,
    name: '3번',
  },
  {
    amount: 8000,
    categoryId: 8,
    isIncome: true,
    name: '2번',
  },
  {
    amount: 19000,
    categoryId: 9,
    isIncome: true,
    name: '7번',
  },
  {
    amount: 15000,
    categoryId: 9,
    isIncome: true,
    name: '9번',
  },
  {
    amount: 33000,
    categoryId: 8,
    isIncome: true,
    name: '3번',
  },
  {
    amount: 8000,
    categoryId: 8,
    isIncome: true,
    name: '2번',
  },
  {
    amount: 117000,
    categoryId: 10,
    isIncome: true,
    name: '6번',
  },
  {
    amount: 6000,
    categoryId: 9,
    isIncome: true,
    name: '7번',
  },
  {
    amount: 19890,
    categoryId: 9,
    isIncome: true,
    name: '9번',
  },
  {
    amount: 31000,
    categoryId: 8,
    isIncome: true,
    name: '3번',
  },
  {
    amount: 3000,
    categoryId: 8,
    isIncome: true,
    name: '2번',
  },
  {
    amount: 15000,
    categoryId: 9,
    isIncome: true,
    name: '7번',
  },
  {
    amount: 15000,
    categoryId: 9,
    isIncome: true,
    name: '9번',
  },
  {
    amount: 31200,
    categoryId: 8,
    isIncome: true,
    name: '3번',
  },
  {
    amount: 850,
    categoryId: 8,
    isIncome: true,
    name: '2번',
  },
  {
    amount: 100,
    categoryId: 10,
    isIncome: true,
    name: '6번',
  },
  {
    amount: 10000,
    categoryId: 9,
    isIncome: true,
    name: '7번',
  },
  {
    amount: 50,
    categoryId: 9,
    isIncome: true,
    name: '9번',
  },
  {
    amount: 5000,
    categoryId: 8,
    isIncome: true,
    name: '3번',
  },
  {
    amount: 8000,
    categoryId: 8,
    isIncome: true,
    name: '2번',
  },
  {
    amount: 6600,
    categoryId: 9,
    isIncome: true,
    name: '7번',
  },
  {
    amount: 15000,
    categoryId: 9,
    isIncome: true,
    name: '9번',
  },
  {
    amount: 3580,
    categoryId: 8,
    isIncome: true,
    name: '3번',
  },
  {
    amount: 8000,
    categoryId: 8,
    isIncome: true,
    name: '2번',
  },
];

const SVG_PATH = 'http://www.w3.org/1999/svg';

export default class ChartSection extends Component {
  private sum: number = 0;
  private chartData: TChartData[];
  private isIncome: boolean;

  constructor() {
    super({});
    historyStore.subscribe(this);
    this.init();
    this.chartData = [];
    this.isIncome = false;
  }

  // 임시 데이터를 들어내고 난 이후 this.chartData로 변경할 예정입니다!
  createChartData(histories: any[]) {
    this.sum = 0;
    const data: TChartData[] = histories.reduce((acc, cur) => {
      // 지출, 수입 flag 테스트
      if (this.isIncome !== cur.isIncome) return acc;
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
    console.log(this);
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

  generateChartAmountTag() {
    return `
    <div class="chart-title">
      <p>이번달은 총</p>
      <p><span>${this.sum.toLocaleString()}</span>원</p>
      <p>쓰셨네요!</p>
    </div>`;
  }

  generateChart() {
    this.createChartData(histories);
    return `
    <div class="svg-wrapper">
      <svg width="250" height="250" viewBox="-1.5 -1.5 3 3">
        ${this.generateDonutChart()}
      </svg>
    </div>
    `;
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
      ${this.generateChartAmountTag()}
      ${this.generateChart()}
      ${this.generateChartTagList()}
    </section>
    `;
  }
}
