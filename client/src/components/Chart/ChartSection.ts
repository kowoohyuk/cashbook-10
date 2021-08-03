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

type TChartData = {
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
];

export default class ChartSection extends Component {
  constructor() {
    super({});
    historyStore.subscribe(this);
    this.init();
  }

  createChartData(histories: any[]) {
    let sum = 0;
    const data: TChartData[] = histories.reduce((acc, cur) => {
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
      sum += cur.amount;
      return acc;
    }, []);
    data.sort((a, b) => b.amount - a.amount);
    data.forEach(d => {
      d.percent = d.amount / sum;
    });
    console.log(data);
    return data;
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
