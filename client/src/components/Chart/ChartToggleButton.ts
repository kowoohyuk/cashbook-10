import { Component } from '../../lib/woowact/index';
import '../../styles/chart/chartToggleButton';
import { $ } from '../../utils/selector';

type TChartToggleButton = {
  isIncome: boolean;
  toggleIsIncome: Function;
};

const BUTTON_CLASS = 'toggle-chart-button';

export default class ChartToggleButton extends Component<
  TChartToggleButton,
  TChartToggleButton
> {
  constructor(props: TChartToggleButton) {
    super(props);
    this.state = {
      ...props,
    };
    this.init();
  }

  onClickButton(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.classList.contains(BUTTON_CLASS)) {
      $(`.${BUTTON_CLASS}`)?.classList.remove('active');
      target.classList.add('active');
      this.state.toggleIsIncome();
    }
  }
  componentDidMount() {
    this.$element.addEventListener('click', e => this.onClickButton(e));
  }

  render(): string {
    return `
    <div class="toggle-chart-buttons">
      <button class="toggle-chart-button ${
        this.props.isIncome ? '' : 'active'
      }">
        지출
      </button>
      <button class="toggle-chart-button ${
        this.props.isIncome ? 'active' : ''
      }">
        수입
      </button>
    </div>
    `;
  }
}
