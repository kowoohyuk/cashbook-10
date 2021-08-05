import { Component } from '../../lib/woowact/index';
import '../../styles/chart/lineChart';

export interface ILineData {
  values: number[];
  color: string;
  title?: string;
  max?: number;
  min?: number;
}

const SVG_PATH = 'http://www.w3.org/2000/svg';

export default class LineChart extends Component<ILineData, ILineData> {
  constructor(
    props: ILineData = {
      color: '#000',
      title: '',
      values: [],
    },
  ) {
    props.min = Math.min(...props.values);
    props.max = Math.max(...props.values);
    super(props);
    this.state = props;
    this.init();
  }

  ganerateChartPaths() {
    const coordinates = this.generateCoordinates(this.state.values);
    const paths = this.generatePaths(coordinates);
    return paths;
  }

  generateCoordinates(values: number[]): number[][] {
    const max = this.state.max as number;
    const x = 100;
    const y = 40;
    const interval = x / (values.length - 1);
    return values.reduce((acc: number[][], cur, index) => {
      acc[index] = [index * interval, (cur / max) * y];
      return acc;
    }, []);
  }

  generatePaths(coordinates: number[][]): string {
    const paths = coordinates.reduce((acc: string[], cur, index) => {
      const [x, y] = cur;
      acc[index] = ` L ${x} ${y}`;
      return acc;
    }, []);
    const [startX, startY] = coordinates[0];
    paths[0] = `M${startX} ${startY}`;
    return paths.join('');
  }

  generateLineChart() {
    const paths = this.ganerateChartPaths();
    const $path = document.createElementNS(SVG_PATH, 'path') as SVGPathElement;
    $path.setAttribute('d', paths);
    $path.setAttribute('fill', 'none');
    $path.setAttribute('stroke', `${this.state.color}`);
    $path.setAttribute('stroke-width', '0.5px');
    $path.setAttribute('stroke-dasharray', `${$path.getTotalLength()}`);

    const $animate = document.createElementNS(SVG_PATH, 'animate');
    $animate.setAttribute('attributeName', 'stroke-dashoffset');
    $animate.setAttribute('from', `${$path.getTotalLength()}`);
    $animate.setAttribute('to', '0');
    $animate.setAttribute('dur', '1');
    $path.appendChild($animate);
    return $path.outerHTML;
  }

  generateBaseLine() {
    const max = Math.ceil(this.state.values.length / 5);
    const baseTags = Array(max)
      .fill('')
      .map((tag, index) => `<p>${index * 5}</p>`)
      .join('');
    return baseTags;
  }

  render() {
    return `
      <div class="line-chart-container">
        <p class="line-chart-title">
          월간 소비 추이
        </p>
        <div class="line-chart-content">
        <label class="line-chart__label min-label">
          ${this.state.max}
        </label>
        <label class="line-chart__label max-label">
          ${this.state.min}
        </label>
          <svg class="line-svg" viewBox="0 0 100 40">
            ${this.generateLineChart()}
          </svg>
        </div>
        <div class="line-chart-baseline">
          ${this.generateBaseLine()}
        </div>
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
