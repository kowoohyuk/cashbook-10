import { Component } from '../../lib/woowact/index';
import { TChartData } from './ChartSection';

// 라인차트 필요한 데이터 양식
// x1 시작 지점
// y1 시작 지점
// x2 종료 지점
// y2 종료 지점
// stroke 컬러
// stroke width 크기
// text 텍스트 여부, 텍스트가 있으면 도트 포인트가 표시 됨!
// animation true, false
// animation 시간

export interface ILineData {
  width: string;
  height: string;
  color?: string;
  min?: number;
  max?: number;
  values: number[] | string[];
  animation?: boolean;
  duration?: number;
  lineWidth?: number;
}

interface ILine {}

const DEFAULT = {
  WIDTH: '100',
  HEIGHT: '100',
  COLOR: '#000',
  MIN: 0,
  MAX: 1,
  ANIMATION: false,
  VALUES: [],
  DURATION: 0,
  LINE_WIDTH: 2,
};

export default class LineChart extends Component<ILineData> {
  constructor(
    props: ILineData = {
      width: DEFAULT.WIDTH,
      height: DEFAULT.HEIGHT,
      color: DEFAULT.COLOR,
      min: DEFAULT.MIN,
      max: DEFAULT.MAX,
      animation: DEFAULT.ANIMATION,
      values: DEFAULT.VALUES,
      duration: DEFAULT.DURATION,
      lineWidth: DEFAULT.LINE_WIDTH,
    },
  ) {
    super(props);
    this.state = props;
    this.init();
  }

  generateLineChart() {
    return '';
  }

  render() {
    const width = 200;
    const height = 200;

    return `
      <div class="line-container">
        ${this.generateLineChart()}

        <svg width="400" height="400" viewBox="0 0 1 1">
          <line x1="0" y1="0.03" x2="0.2" y2="0.4" stroke="blue" stroke-width="0.005"></line>
          <line x1="0.2" y1="0.4" x2="0.4" y2="0.3" stroke="violet" stroke-width="0.005"></line>
          <line x1="0.4" y1="0.3" x2="0.6" y2="0.7" stroke="green" stroke-width="0.005"></line>
          <line x1="0.6" y1="0.7" x2="0.8" y2="0.1" stroke="red" stroke-width="0.005"></line>
          <line x1="0.8" y1="0.1" x2="1" y2="0.9" stroke="black" stroke-width="0.005"></line>
        </svg>
      </div>
    `;
  }
}

// <svg width="200" height="200" viewBox="0 0 200 200">
// <line x1="0" y1="200" x2="40" y2="20" stroke="blue"></line>
// <line x1="40" y1="20" x2="80" y2="100" stroke="violet"></line>
// <line x1="80" y1="100" x2="120" y2="50" stroke="green"></line>
// <line x1="120" y1="50" x2="160" y2="200" stroke="red"></line>
// <line x1="160" y1="200" x2="200" y2="130" stroke="black"></line>
// </svg>
